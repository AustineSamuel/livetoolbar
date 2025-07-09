import React from 'react'
import { View } from 'react-native'

 const BR:React.FC<{height?:number}> = ({height=10}) => {
  return (
   <View style={{height}}></View>
  )
}


export default BR