import React from 'react'
import { ActivityIndicator, View } from 'react-native'

const LoadingScreen:React.FC<{size?:number,color?:string}> = ({size,color}) => {
  return (
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <ActivityIndicator color={color} size={(size as number)||30 }/>
    </View>
  )
}

export default LoadingScreen