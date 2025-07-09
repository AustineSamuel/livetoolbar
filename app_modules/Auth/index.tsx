import globStyle from '@/glob/style';
import Header from '@/utils/Header';
import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

export default function InitAuth() {
    //check who is user and take him to the right screen
  return (
    <View style={[{flex:1},globStyle.flexItem,globStyle.alignCenter,globStyle.justifyCenter]}>
      <ActivityIndicator size={30}/>
     </View>
  );
}
