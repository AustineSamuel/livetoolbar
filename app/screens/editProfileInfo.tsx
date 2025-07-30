import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, ScrollView } from 'react-native';
import Header from '@/utils/Header';
import useUser from '@/hooks/useUser';
import { User } from '@/types/user.types';
import * as ImagePicker from 'expo-image-picker';
import { Feather } from '@expo/vector-icons';
import MyButton from '@/utils/button';
import colors from '@/constants/Colors';
import { screenPadding } from '@/glob/style';
import { useDispatch } from 'react-redux';
import { showNotification } from '@/store/notificationSlice';
import { getErrorMessage } from '@/utils/getErrorMesage';
import { docQr } from '@/Logics/docQr';
import { collection } from 'firebase/firestore';
import { updateData } from '@/Logics/updateData';
import { setUser } from '@/store/slices';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditProfileInfo: React.FC = () => {
  const user = useUser();
const [pleaseWait,setPleaseWait]=useState<boolean>(false);
  const [form, setForm] = useState<User>({
    ...user,
    password: '',
    recentPasswords: [],
  } as User);

  useEffect(()=>{
setForm({
      ...user,
    password: '',
    recentPasswords: [],
}as User)
  },[user]);

  const [photo, setPhoto] = useState<string>(user?.photo || '');

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
      setForm({ ...form, photo: result.assets[0].uri });
    }
  };

  const handleChange = (key: keyof User, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const dispatch=useDispatch();
  const handleSave =async () => {
    try{
      if(pleaseWait)return false;
      setPleaseWait(true)
    
      if(form.password!==user?.password){
        dispatch(showNotification({
          message:"Password is incorrect, please provide your password to proceed with your request",
          type:"error"
        }))
  return
      }
      const newUserData={
  ...form,
  password:user?.password,

}
const updateReq=await updateData('Users',user?.docId||"",newUserData)
dispatch(setUser({...form,password:user?.password}));
await AsyncStorage.setItem("user",JSON.stringify(newUserData));

  
    }
    catch(Err:any){
      dispatch(showNotification({
        message:getErrorMessage(Err),
        type:"error"
      }));
    }
    finally{
      setPleaseWait(false);
    }
  };

  return (
    <>
      <Header title="Edit Profile" />
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity onPress={handlePickImage} style={styles.photoContainer}>
          {photo ? (
            <Image source={{ uri: photo }} style={styles.photo} />
          ) : (
            <View style={styles.placeholder}>
              <Feather name="camera" size={24} color="#666" />
              <Text style={styles.placeholderText}>Add Photo</Text>
            </View>
          )}
        </TouchableOpacity>

        {[
          { key: 'username', label: 'Username' },
          { key: 'fullname', label: 'Full Name' },
          { key: 'email', label: 'Email' },
          { key: 'NIN', label: 'NIN' },
          { key: 'password', label: 'Password' },
        ].map(({ key, label }) => (
          <View key={key} style={styles.inputGroup}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
              value={form[key as keyof User]?.toString()}
              onChangeText={(text) => {
           if(key=="username")return dispatch(showNotification({
            message:"Can't edit user name",
            type:"info"
           }))
                handleChange(key as keyof User, text)
              }}
              secureTextEntry={key === 'password'}
              style={styles.input}
              placeholder={`Enter ${label.toLowerCase()}`}
            />
          </View>
        ))}

        <MyButton label="Save Changes" onPress={handleSave} style={{ backgroundColor: colors.primaryColor }} />
      </ScrollView>
    </>
  );
};

export default EditProfileInfo;

const styles = StyleSheet.create({
  container: {
    padding: screenPadding,
    paddingBottom: 80,
    gap: 20,
    backgroundColor:colors.background
  },
  photoContainer: {
    alignSelf: 'center',
    borderRadius: 100,
    overflow: 'hidden',
    width: 120,
    height: 120,
    backgroundColor: '#eee',
  },
  photo: {
    width: 120,
    height: 120,
  },
  placeholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 12,
    color: '#666',
  },
  inputGroup: {
    gap: 4,
  },
  label: {
    fontSize: 14,
    color: '#444',
  },
  input: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f2f2f2',
    fontSize: 16,
  },
});
