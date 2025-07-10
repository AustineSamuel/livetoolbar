import globStyle from '@/glob/style';
import { router } from 'expo-router';
import React, { useEffect } from 'react'
import { ActivityIndicator, Text, View } from 'react-native'

const Init:React.FC = () => {
    useEffect(()=>{
     setTimeout(() => {
        console.log("should go to login..")
router.push("/screens/login");
     }, 2000)
    },[])
  return (
 <View style={[{flex:1},globStyle.alignCenter,globStyle.justifyCenter]}>
<ActivityIndicator size={50}/>
 </View>
  )
}

export default Init;
