import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, Image } from 'react-native';
import Header from '@/utils/Header';
import MyButton from '@/utils/button'; // or use TouchableOpacity if you don't have MyButton
import colors from '@/constants/Colors';
import globStyle, { screenPadding } from '@/glob/style';
import useUser from '@/hooks/useUser';
import { deleteData } from '@/Logics/deleteData';
import { useDispatch } from 'react-redux';
import { showNotification } from '@/store/notificationSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setUser } from '@/store/slices';
import { router } from 'expo-router';

const DeleteAccount = () => {
  const user=useUser();
  const dispatch=useDispatch();
  const [deleting,setDeleting]=useState<boolean>(false);
  const handleDelete = () => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to permanently delete your account? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: async() => {
          // TODO: Implement delete logic here
          // console.log("Account deleted");
          setDeleting(true);
          await deleteData("Users",user?.docId||"");
          dispatch(showNotification({
            message:"account deleted successfully",
            type:"success"
          }));
          await AsyncStorage.clear();
         dispatch(setUser(null));
         router.push("/screens/oboarding");
          setDeleting(false);
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
          label={deleting? "Please wait...":"Delete My Account"}

          onPress={deleting ? ()=>{}:handleDelete}
          style={{ backgroundColor: colors.danger || 'red',borderRadius:30,opacity:deleting? 0.6:1}}
          
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
