import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import globStyle from '@/glob/style'
import colors from '@/constants/Colors'

interface props{
    checked:boolean,
    title:React.ReactElement,
    onPress:()=>void
    color?:string
}
const CheckBox:React.FC<props> = ({checked,title,onPress,color}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[
        globStyle.flexItem,
        globStyle.alignCenter,
        {
          gap:10
        }
      ]}>
        {checked ? 
          <FontAwesome name="check-square" size={24} color={color||colors.black} />:<FontAwesome name="square-o" size={24} color={color||colors.black} />}
      
      <Text style={{maxWidth:"90%"}}>
      {title}
      </Text>
        </TouchableOpacity>
  )
}

export default CheckBox
