import { View, Text } from 'react-native'
import React from 'react'
import Header from '@/utils/Header'
import { screenPadding } from '@/glob/style'

const Notification = () => {
  return (
    <View style={{flex:1}}>
        <Header title={`Notification`}/>
        <View style={{padding:screenPadding}}>
      <Text>Notification</Text>
      </View>
    </View>
  )
}

export default Notification