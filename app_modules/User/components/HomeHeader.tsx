import colors from '@/constants/Colors'
import globStyle from '@/glob/style'
import ImageAvatar from '@/utils/ClickableImage'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import { DrawerToggleButton } from '@react-navigation/drawer'
import { router } from 'expo-router'
import React from 'react'
import { Pressable, View } from 'react-native'
import { Avatar } from 'react-native-paper'

const HomeHeader:React.FC=() => {
    
  return (
   <View style={[{backgroundColor:colors?.white,padding:10},globStyle.flexItem,globStyle.flexBetween]}>

<View style={[globStyle.flexItem,globStyle.alignCenter,{gap:10}]}>
    <DrawerToggleButton />
    <Pressable onPress={()=>{
        router.push("/(tabs)/profile")
    }}>
        <ImageAvatar   size={25} source={require("@/assets/images/user.jpeg")}/>
    </Pressable>
</View>



<View style={[globStyle.flexItem,globStyle.alignCenter,{gap:10}]}>
    <Pressable onPress={()=>{
        router.push("/screens/notifications")
    }}>
        <AntDesign size={25}  name="bells"/>
    </Pressable>
</View>


    </View>
  )
}

export default HomeHeader
