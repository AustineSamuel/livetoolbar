import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import globStyle from '@/glob/style';
import { formatToNaira } from '../../../../Logics/date';
import colors from '@/constants/Colors';
import MyButton from '@/utils/button';

const NotEligibleMessage = () => {
  return (
    <View style={styles.container}>
      <View style={[globStyle.flexItem, globStyle.alignCenter, globStyle.justifyCenter]}>
        <Image
          source={require("@/assets/images/not-eligible.png")}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.message}>
        Dear user, you are not eligible to view and apply for available job offers here.{"\n\n"}
        Kindly register as a job seeker at the rate of <Text style={styles.highlight}>{formatToNaira(1500,true)}</Text>.
      </Text>
      <MyButton textStyle={{color:colors?.black}} label='Register now' style={{backgroundColor:colors?.primaryColor,borderRadius:30}}></MyButton>
    </View>
  );
};

export default NotEligibleMessage;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  message: {
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  highlight: {
    fontWeight: 'bold',
  },
});
