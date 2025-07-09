
import colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'

const TimesCancelBtn:React.FC<{press:(() => void)}> = ({press}) => {
    
  return (
    <TouchableOpacity  style={{display:"flex",alignItems:"center",justifyContent:"center", backgroundColor:colors?.lightGray,width:30,height:30,borderRadius:15}} onPress={press}>
    <Ionicons name="close-outline" size={24} color="black" />
    </TouchableOpacity>
  )
}

export default TimesCancelBtn