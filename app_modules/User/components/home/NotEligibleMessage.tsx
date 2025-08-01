import { View, Text, Image, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import globStyle from '@/glob/style';
import { formatToNaira } from '../../../../Logics/date';
import colors from '@/constants/Colors';
import MyButton from '@/utils/button';
import { getErrorMessage } from '@/utils/getErrorMesage';
import { docQr } from '@/Logics/docQr';
import { useDispatch } from 'react-redux';
import { showNotification } from '@/store/notificationSlice';
import useUser from '@/hooks/useUser';
import chargeUser from '../../logic/chargeUser';
import { AddData } from '@/Logics/addData';
import { getCurrentTimestamp } from '@/Logics/DateFunc';
import { collection } from 'firebase/firestore';
import { db } from '@/firebase.config';
import { setUser } from '@/store/slices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { JobsScreen } from '../Jobs';

const NotEligibleMessage = () => {
  const [register,setRegister]=useState<boolean>(false);
  const [working,setWorking]=useState<boolean>(false);
  const [loading,setLoading]=useState<boolean>(true);
  const [error,setError]=useState<string>("");
  const dispatch=useDispatch();
  const user=useUser();
  const registerUserToSeeJobs=async ()=>{
try{
//add users to see jobs list
setWorking(true);
const exist=await docQr("users-to-jobs",{
whereClauses:[
  {
    field:"userId",
    operator:"==",
    value:user?.userId||""
  }
]
});
if(exist?.length == 0 ){
  // console.log("should add users")
  // chargeUser and add user
const res=  await chargeUser(1500,user?.userId||"");
if(res?.error)return dispatch(showNotification({message:res?.error,type:"error"}))
dispatch(setUser(res?.user));
const res1=await AddData(collection(db,"users-to-jobs"),{
userId:user?.userId,
addedAt:getCurrentTimestamp(),
paid:true
})
AsyncStorage.setItem("User",JSON.stringify(res?.user));
dispatch(showNotification({
  "message":"Job registration successful",
  type:"success"
}));
setRegister(true);
}
else{
 dispatch(showNotification({
  "message":"Registration already exist",
  type:"error"
}))
}
}
catch(err:any){
setError(getErrorMessage(err))
dispatch(showNotification({
  message:getErrorMessage(err),
  type:"error"
}))
}
finally{
  setWorking(false);
}
  }


  useEffect(()=>{
    (async ()=>{
      try{
      setLoading(true);
      const res=await docQr("users-to-jobs",{
        whereClauses:[
          {
            field:"userId",
            operator:"==",
            value:user?.userId
          }
        ]
      });
setRegister((res?.[0]) ? true:false)
      setLoading(false);
    }
    catch(err:any){
      setError(getErrorMessage(err));
    }
    finally{
      setLoading(false);
    }
    })();
  },[user?.userId]);
  if(register)return <JobsScreen/>
  if(loading )return <Text>Loading Jobs....</Text>
  return (
    <View style={styles.container}>
      <View style={[globStyle.flexItem, globStyle.alignCenter, globStyle.justifyCenter]}>
        <Image
          source={require("@/assets/images/not-eligible.png")}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.message}>
        Dear user, you are not eligible to view and apply for available job offers here.{"\n\n"}
        Kindly register as a job seeker at the rate of <Text style={styles.highlight}>{formatToNaira(1500,true)}</Text>.
      </Text>
      <MyButton  onPress={()=>registerUserToSeeJobs()} textStyle={{color:colors?.black,opacity:working ? 0.7:1}} label={working ? "Please wait...":'Register now'} style={{backgroundColor:colors?.primaryColor,borderRadius:30,opacity:working ? 0.5:1}}></MyButton>
    </View>
  );
};

export default NotEligibleMessage;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  message: {
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  highlight: {
    fontWeight: 'bold',
  },
});
