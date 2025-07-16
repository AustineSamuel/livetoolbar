import globStyle from '@/glob/style';
import { parse } from '@/Logics/date';
import { docQr } from '@/Logics/docQr';
import { setUser } from '@/store/slices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React, { useEffect } from 'react'
import { ActivityIndicator, Text, View } from 'react-native'
import { useDispatch } from 'react-redux';

const Init:React.FC = () => {
  const dispatch=useDispatch();
    useEffect(()=>{
    (async () => {
      
  const user=parse(await AsyncStorage.getItem("User")||"null")
      if(user){
      const serverUser=await docQr("Users",{
        whereClauses:[
          {
            field:"userId",
            operator:"==",
            value:user?.userId
          }
        ]
      })
      if(serverUser?.[0]){
        router.push("/(tabs)")
        dispatch(setUser(serverUser?.[0]))
        AsyncStorage.setItem("User",JSON.stringify(serverUser?.[0]));
      }
      else{
router.push("/screens/login");
      }
        return 
      }
router.push("/screens/login");
     })();

    },[])
  return (
 <View style={[{flex:1},globStyle.alignCenter,globStyle.justifyCenter]}>
<ActivityIndicator size={50}/>
 </View>
  )
}

export default Init;
