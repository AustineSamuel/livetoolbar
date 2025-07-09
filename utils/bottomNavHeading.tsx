import React from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import globStyle from '@/glob/style'
import colors from '@/constants/Colors'
interface props{
    text?:string | React.ReactNode,
    onClose?:()=>void,
}
const BottomNavHeading:React.FC<props> = ({text,onClose}) => {

  return (
    <View style={[globStyle.flexBetween,globStyle.flexGap10,globStyle.flexItem,globStyle.alignCenter,{width:"100%"}]}>  
   {/* {onFilter && <TextInput
          style={styles.input}
          placeholder="Filter Countries"
          
          onChangeText={onFilter} // Update filter state
        />} */}
  {text && <Text style={{fontWeight:"700",fontSize:18}}>{typeof text =='string' ? text:text}</Text>}
  <TouchableOpacity style={[globStyle.flexCenter,styles.closeButton,globStyle.flexItem]} onPress={()=>{
            if(onClose)onClose()
          }}><Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
  </View>
  )
}

export default BottomNavHeading




const styles=StyleSheet.create({
    closeButton: {
      backgroundColor: '#eee',
      width:40,
      height:40,
      borderRadius: 20,
      // position:"absolute",
      right:0,
      top:0
    },
    closeButtonText: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    input: {
      borderColor:colors.lightGray,
      borderBottomWidth: 1,
      padding: 10,
      borderRadius: 5,
      width: '85%',
    },
  })