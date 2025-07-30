import React from 'react';
import { View, Text, StyleSheet, Alert, Image } from 'react-native';
import Header from '@/utils/Header';
import MyButton from '@/utils/button'; // or use TouchableOpacity if you don't have MyButton
import colors from '@/constants/Colors';
import globStyle, { screenPadding } from '@/glob/style';

const DeleteAccount = () => {
  const handleDelete = () => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to permanently delete your account? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => {
          // TODO: Implement delete logic here
          console.log("Account deleted");
        }},
      ]
    );
  };

  return (
    <>
      <Header title="Delete Account" />
      <View style={styles.container}>


<View style={[globStyle.flexItem,globStyle.alignCenter,globStyle.justifyCenter,{
    padding:16
}]}>
<Image source={require("../../assets/images/delete-icon.jpeg")}  width={150} height={150} style={{borderRadius:10,
    width:150,
    height:150
}}/>
</View>
        <Text style={styles.message}>
          Deleting your account will remove all your data and cannot be undone.
        </Text>

        <MyButton
          label="Delete My Account"
          onPress={handleDelete}
          style={{ backgroundColor: colors.danger || 'red',borderRadius:30}}
        />
      </View>
    </>
  );
};

export default DeleteAccount;

const styles = StyleSheet.create({
  container: {
    padding: screenPadding,
    flex: 1,
    backgroundColor:colors?.background,
    justifyContent: 'center',
    gap: 20,
  },
  message: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
    textAlign: 'center',
  },
});
