import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import MyButton from "@/utils/button";
import colors from "@/constants/Colors";
import { useDispatch } from "react-redux";
import { showNotification } from "@/store/notificationSlice";
import { AddData } from "@/Logics/addData";
import { getErrorMessage } from "@/utils/getErrorMesage";
import { collection } from "firebase/firestore";
import { db } from "@/firebase.config";
import globStyle, { height, screenPadding } from "@/glob/style";
import { service, servicesData } from "@/app_modules/static-data/services";
import { Entypo } from "@expo/vector-icons";
import { router } from "expo-router";
import { docQr } from "@/Logics/docQr";
import useUser from "@/hooks/useUser";
import { ProvidersService } from "./ApplyAsServiceProvider";
import { formatTimestamp } from "@/utils/funcs";
import moment from "moment";
import RenderProviderResponseMessage from "@/app_modules/Vendor/components/renderProviderResponseMessage";
import { uploadFile } from '../../Logics/upload';
import { uploadImage } from "@/lib/upload";



interface Props {
  existingFormData: any;
  onSuccess?: () => void;
}


const ProviderApplicationForm: React.FC<Props> = ({ existingFormData, onSuccess }) => {
  const [selectedService, setSelectedService] = useState<service | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [certificates, setCertificates] = useState<string[]>([]);
  const [nin, setNin] = useState<string>("");
  const [pleaseWait, setPleaseWait] = useState(false);
  const [loading,setLoading]=useState<boolean>(false);
  const [alreadyApplied,setAlreadyApplied]=useState<ProvidersService | undefined>();
  const dispatch = useDispatch();

  const openServiceModal = () => setModalVisible(true);
  const closeServiceModal = () => setModalVisible(false);
const user=useUser();
  const init=async (userid:string)=>{
    try{
      setLoading(true);
const _=await docQr("service_providers",{
  whereClauses:[
    {
      field:"uid",
      operator:"==",
      value:userid
    }
  ]
})
setAlreadyApplied(_?.[0]);
    }
    catch(err:any){
// console.error(err);
setAlreadyApplied(undefined);
    }
    finally{
setLoading(false);
    }
  }
  const handleSelectService = (srv: service) => {
    setSelectedService(srv);
    closeServiceModal();
  };

  useEffect(()=>{
if(user?.userId)init(user?.userId);
  },[user]);

  const pickCertificates = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ multiple: true });
      if (!result.canceled) {
        setCertificates(result.assets.map((a:any) => a.uri));
      }
    } catch (err) {
      dispatch(showNotification({ message: "Failed to pick certificates", type: "error" }));
    }
  };

  const pickNIN = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync();
      if (!result.canceled) {
        setNin(result.assets[0].uri);
      }
    } catch (err) {
      dispatch(showNotification({ message: "Failed to pick NIN file", type: "error" }));
    }
  };

  const handleSubmit = async () => {
    if (!selectedService) {
      dispatch(showNotification({ message: "Select a service", type: "error" }));
      return;
    }
    if (!nin) {
      dispatch(showNotification({ message: "Upload your NIN document", type: "error" }));
      return;
    }

    try {
      setPleaseWait(true);
      const ninUrl=!nin.includes("https") ? await uploadImage(nin):nin;
      let certificationsUrls:string[]=[];
      for (let i = 0; i < certificates.length-1; i++) {
        const ctfct = certificates?.[i];
        console.log(ctfct);
        if(!ctfct)continue
        if(!ctfct?.includes("https")){
          const {url}=await uploadImage(ctfct);
          certificationsUrls.push(url);
        }
      }
      await AddData(collection(db, "service_providers"), {
        ...existingFormData,
        jobUid: selectedService.serviceId,
        certifications: certificationsUrls,
        NIN: ninUrl,
        approved:false,
        approvedAt:"",
        uid:user?.userId,
  declined:false,
  declinedAt:"",
  reasonForDeclined:"",
  user
      });
      dispatch(showNotification({
        message: "Application submitted successfully",
        type: "success",
      }));

      onSuccess?.();
      router.push("/(tabs)")
    } catch (err: any) {
      dispatch(showNotification({
        message: getErrorMessage(err),
        type: "error",
      }));
    } finally {
      setPleaseWait(false);
    }
  };
  if(loading)return <View style={{flex:1,padding:30,height:height,marginTop:40}}>
<ActivityIndicator size={20}/>
  </View>
if(alreadyApplied)return <RenderProviderResponseMessage alreadyApplied={alreadyApplied}/>
  return (
    <View style={{ padding: screenPadding }}>
      <Text style={styles.heading}>Complete Your Application</Text>
      <Text style={styles.message}>
        Choose the service you offer and upload required documents.
      </Text>

      {/* Service Selection */}
      <TouchableOpacity onPress={openServiceModal} style={styles.dropdown}>
     <View style={[globStyle.flexItem,globStyle.alignCenter,{width:'90%'},{gap:10}]}>
      <Image width={30} height={30} source={{uri:selectedService?.image||""}}/>
                <Text style={{}}> {selectedService?.name||""}</Text>
     </View>
     <View style={{width:50}}>
    <Entypo name="chevron-down" size={24} color="black" />
     </View>
      </TouchableOpacity>

      {/* Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <TouchableOpacity
          activeOpacity={1}
          onPress={closeServiceModal}
          style={styles.modalOverlay}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Choose a Service</Text>
            <ScrollView style={{height:height/4}}>
            {servicesData.map((srv) => (
              <TouchableOpacity
                key={srv.serviceId}
                style={styles.modalItem}
                onPress={() => handleSelectService(srv)}
              >
                <Image width={30} height={30} source={{uri:srv.image}}/>
                <Text> {srv.name}</Text>
              </TouchableOpacity>
            ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* File Pickers */}
      <TouchableOpacity onPress={pickCertificates} style={styles.uploadBox}>
        <Text>{certificates.length > 0 ? `Selected ${certificates.length} certificates` : "Upload Certificates"}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={pickNIN} style={styles.uploadBox}>
        <Text>{nin ? "NIN Uploaded" : "Upload NIN Document"}</Text>
      </TouchableOpacity>

      <MyButton
        label={pleaseWait ? "Submitting..." : "Submit Application"}
        onPress={pleaseWait ? ()=>1:handleSubmit}
        style={{ backgroundColor: colors.primaryColor }}
      />
    </View>
  );
};

export default ProviderApplicationForm;

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 10,
  },
  message: {
    fontSize: 15,
    color: "#444",
    marginBottom: 20,
  },
  dropdown: {
    display:'flex',
    alignContent:'center',
    flexDirection:"row",
    justifyContent:"flex-start",
    gap:5,
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    backgroundColor: "#f8f8f8",
    marginBottom: 15,
  },
  uploadBox: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 15,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    height:height-(height/4),

  },
  modalTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 15,
  },
  modalItem: {
    paddingVertical: 10,
    display:'flex',
    alignItems:'center',
    flexDirection:'row',
    gap:10,
    // justifyContent:"center",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
});
