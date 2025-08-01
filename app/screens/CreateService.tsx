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
import * as ImagePicker from 'expo-image-picker';
import { addDoc, collection } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { router } from 'expo-router';
import Header from '@/utils/Header';
import colors from '@/constants/Colors';
import { uploadImage } from '@/lib/upload';
import { showNotification } from '@/store/notificationSlice';
import { db } from '@/firebase.config';
import { generateUniqueString } from '@/Logics/date';

const CreateServiceScreen = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled && result.assets?.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  const handleCreate = async () => {
    if (!name || !image) {
      return Alert.alert('Please fill all fields');
    }

    try {
      setLoading(true);
      let uploadedImage = image;

      if (!image.includes('https')) {
        const { url } = await uploadImage(image);
        uploadedImage = url;
      }

      const newService = {
        name,
        image: uploadedImage,
        serviceId: generateUniqueString(16),
      };

      await addDoc(collection(db, 'Services'), newService);

      dispatch(
        showNotification({ message: 'Service created successfully', type: 'success' })
      );
      router.back();
    } catch (err: any) {
      dispatch(
        showNotification({ message: 'Create error: ' + err.message, type: 'error' })
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header title="Create New Service" />
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
          onPress={handleCreate}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Creating...' : 'Create Service'}
          </Text>
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
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CreateServiceScreen;
