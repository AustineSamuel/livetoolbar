import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
  Image,
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
import { servicesData } from "@/app_modules/static-data/services";
import { Entypo } from "@expo/vector-icons";

export interface service {
  name: string;
  image: string;
  serviceId: string;
}

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
  const dispatch = useDispatch();

  const openServiceModal = () => setModalVisible(true);
  const closeServiceModal = () => setModalVisible(false);

  const handleSelectService = (srv: service) => {
    setSelectedService(srv);
    closeServiceModal();
  };

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
      await AddData(collection(db, "service_providers_forms"), {
        ...existingFormData,
        jobUid: selectedService.serviceId,
        certifications: certificates,
        NIN: nin,
      });

      dispatch(showNotification({
        message: "Application submitted successfully",
        type: "success",
      }));

      onSuccess?.();
    } catch (err: any) {
      dispatch(showNotification({
        message: getErrorMessage(err),
        type: "error",
      }));
    } finally {
      setPleaseWait(false);
    }
  };

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
        onPress={handleSubmit}
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
