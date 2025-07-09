import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MyButton from './button'
import Colors from '@/constants/Colors'
import { screenPadding } from '@/glob/style'
interface props{
  title?:string | React.ReactNode,
  text:string | React.ReactNode,
  retryButton?:()=>void,
  more_styles?:React.CSSProperties,
  retryButtonText?:string
}
const RenderError:React.FC<props> = ({title,text,retryButton,more_styles,retryButtonText}) => {
  return (
   <View style={[styles.container,(more_styles as any||{})]}>
{title && <Text style={styles.heading}>
  {title}
</Text>}

<Text style={styles.text}>{text}</Text>
  
  {retryButton && <MyButton onPress={retryButton} style={{
backgroundColor:Colors.white,
width:"100%",
paddingVertical:10
  }} >
    <Text style={{textAlign:"center"}}>{retryButtonText || "Retry"}</Text>
  </MyButton>}
   </View>
  )
}

const styles=StyleSheet.create({
    container:{
borderRadius:10,
backgroundColor:"rgba(252, 219, 219, 0.71)",
padding:screenPadding
    },
    heading:{
        fontWeight:"800",
textAlign:"center",
lineHeight:20,
fontSize:16
    },
    text:{
        fontWeight:"400",
textAlign:"center",
lineHeight:30
    }
})
export default RenderError;
