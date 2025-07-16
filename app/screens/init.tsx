import globStyle from '@/glob/style';
import { parse } from '@/Logics/date';
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
        router.push("/(tabs)")
        dispatch(setUser(user));
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
