import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Image,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { doc, updateDoc } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
import { db } from '@/firebase.config';
import Header from '@/utils/Header';
import colors from '@/constants/Colors';
import { service } from '@/app_modules/static-data/services';
import { deleteData } from '@/Logics/deleteData';
import { showNotification } from '@/store/notificationSlice';
import { useDispatch } from 'react-redux';
import { uploadImage } from '@/lib/upload';

const EditServiceScreen = () => {
  const params = useLocalSearchParams();
  const item = params.item ? JSON.parse(params.item as string) as service : null;

  const [name, setName] = useState(item?.name || '');
  const [image, setImage] = useState(item?.image || '');
  const [loading, setLoading] = useState(false);
  const [deleting,setDeleting]=useState<boolean>(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled && result.assets?.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  const handleUpdate = async () => {
    if (!name || !image || !item?.docId) {
      return Alert.alert('Please fill all fields');
    }
    try {
      setLoading(true);
      let img=image;
      if(!image.includes("https")){
        const {url}=await uploadImage(image);
        img=url
      }
      const ref = doc(db, 'Services', item.docId);
      await updateDoc(ref, {
        name,
        image:img,
      });
      dispatch(showNotification({message:'Service updated successfully',type:"success"}));
      router.back();
    } catch (err: any) {
      dispatch(showNotification({message:'Update error'+ err.message,type:"error"}));
    } finally {
      setLoading(false);
    }
  }

  const dispatch=useDispatch();
  const handleDelete = async () => {
    Alert.alert('Confirm Delete', 'Are you sure you want to delete this service?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            setLoading(true);
            await deleteData('Services', item?.docId || '');
  
   dispatch(showNotification({message:'Service deleted successfully',type:"error"}))
    
            router.back();
          } catch (err: any) {
            Alert.alert('Delete error', err.message);
          } finally {
            setLoading(false);
          }
        },
      },
    ]);
  };

  return (
    <>
      <Header title="Edit Service" />
      <View style={styles.container}>
        <Text style={styles.label}>Service Name</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          style={styles.input}
          placeholder="Enter service name"
        />

        <Text style={styles.label}>Service Image</Text>

        {image ? (
          <Image source={{ uri: image }} style={styles.imagePreview} />
        ) : (
          <Text style={{ color: '#888', marginBottom: 10 }}>No image selected</Text>
        )}

        <TouchableOpacity onPress={pickImage} style={styles.uploadBtn}>
          <Text style={styles.uploadText}>Choose Image</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { opacity: loading ? 0.6 : 1 }]}
          disabled={loading}
          onPress={handleUpdate}
        >
          <Text style={styles.buttonText}>{loading ? 'Updating...' : 'Update Service'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.deleteButton, { opacity: loading ? 0.6 : 1 }]}
          disabled={loading}
          onPress={handleDelete}
        >
          <Text style={styles.buttonText}>{deleting ? 'Deleting...' : 'Delete Service'}</Text>
        </TouchableOpacity>

        {loading && <ActivityIndicator color={colors.primaryColor} style={{ marginTop: 10 }} />}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: colors.white,
    flex: 1,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 15,
    height: 48,
  },
  imagePreview: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
    borderRadius: 8,
    marginBottom: 10,
  },
  uploadBtn: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  uploadText: {
    color: '#555',
  },
  button: {
    backgroundColor: colors.primaryColor,
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: 'red',
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default EditServiceScreen;


