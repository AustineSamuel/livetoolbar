import React, { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, ActivityIndicator } from "react-native";
import Header from "@/utils/Header";
import { formatToNaira } from '../../Logics/date';
import { useDispatch } from "react-redux";
import { showNotification } from "@/store/notificationSlice";
import { getErrorMessage } from "@/utils/getErrorMesage";
import MyButton from "@/utils/button";
import colors from "@/constants/Colors";
import { docQr } from "@/Logics/docQr";
import useUser from "@/hooks/useUser";
import globStyle, { screenPadding } from "@/glob/style";
import { AddData } from "@/Logics/addData";
import { collection } from "firebase/firestore";
import { db } from "@/firebase.config";
import ProviderApplicationForm from "./ProviderApplicationForm";
import chargeUser from '../../app_modules/User/logic/chargeUser';
import { useFocusEffect } from "expo-router";
import { User } from "@/types/user.types";

export type JobsUids=string
export interface ProvidersService{
    certifications:string[],
    NIN:string,
    uploadedAt:string,
    appliedJobs:JobsUids[],
    username:string,
    userProfilePic:string
  uid:string,
  approved:boolean,
  approvedAt:string,
  declined:boolean,
  declinedAt:string,
  reasonForDeclined:string,
  user:User,
  docId?:string
}



const ApplyAsServiceProvider = () => {
  const [applicationFee, setApplicationFee] = useState<number>(5000);
const dispatch=useDispatch();
const [loading,setLoading]=useState<boolean>(true);
  const [pleaseWait,setPleaseWait]=useState<boolean>(false);
const user=useUser()
const [existingFormData,setExistingFormData]=useState<any>();
  const fetchDetails=async ()=>{
    try{
        setLoading(true)
const res=await docQr(`service_providers_forms`,{
    whereClauses:[
        {
            field:"uid",
            operator:"==",
            value:user?.userId||""
        }
    ]
})
if(res?.length > 0){
setExistingFormData(res[0]);

}
    }
    catch(err:any){
dispatch(showNotification({
    message:getErrorMessage(err),
    type:"error"
}))
    }
    finally{
        setLoading(false);
    }
  }
  const handleApply = async() => {
    try{
        setPleaseWait(true)
        const charge_responses=await chargeUser(applicationFee,user?.userId||"");
        console.log(charge_responses);
        if(charge_responses.error)return dispatch(showNotification({
            message:charge_responses.error,
        type:"error"
        }));

        const res=await AddData(collection(db,"service_providers_forms"),{
            uid:user?.userId
        })
        setExistingFormData({
            uid:user?.userId
        });

 dispatch(showNotification({
    message:"Form purchased successfully",
    type:"success"
}))
    }
    catch(err:any){
dispatch(showNotification({
    message:getErrorMessage(err),
    type:"success"
}));
    }
    finally{
        setPleaseWait(false);
    }
  }

  useFocusEffect(useCallback(()=>{
if(user)fetchDetails();
  },[user]))
if(loading)return <View  style={[{padding:screenPadding},globStyle.flexItem,globStyle.centerContent,globStyle.alignCenter,{flex:1}]}>
    <ActivityIndicator size={30}/>
</View>
  return (
    <>
      <Header title="Apply As Provider" />
      {existingFormData ? (
  <ProviderApplicationForm existingFormData={existingFormData} />
) : (
  <>
      <View style={styles.container}>
        <Text style={styles.heading}>Become a Verified Service Provider</Text>
        <Text style={styles.message}>
          Unlock exclusive access to top-paying jobs by becoming a verified
          provider on LifeToolbar. Fill out your application form today.
        </Text>
        <View style={styles.feeContainer}>
          <Text style={styles.feeLabel}>Application Fee:</Text>
          <Text style={styles.feeValue}>{formatToNaira(applicationFee,true)}</Text>
        </View>
    <View style={styles.feeContainer}>
          <Text style={styles.feeLabel}>Transaction Fee:</Text>
          <Text style={styles.feeValue}>{formatToNaira(0,true)}</Text>
        </View>

            <View style={styles.feeContainer}>
          <Text style={styles.feeLabel}>Total:</Text>
          <Text style={styles.feeValue}>{formatToNaira(applicationFee,true)}</Text>
        </View>

        <MyButton style={{backgroundColor:colors.primaryColor}} label={pleaseWait ? `Please wait...`:`Get Application Form`} onPress={handleApply} />
      </View>
      </>)}
    </>
  );
};

export default ApplyAsServiceProvider;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 20,
    backgroundColor: "#fff",
    flex: 1,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#222",
  },
  message: {
    fontSize: 16,
    color: "#555",
    lineHeight: 24,
  },
  feeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: "#f5f5f5",
  },
  feeLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#444",
  },
  feeValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#00a86b",
  },
});
