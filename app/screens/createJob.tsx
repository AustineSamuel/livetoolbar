import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import Header from '@/utils/Header'
import { uploadImage } from '@/lib/upload'
import { useDispatch } from 'react-redux'
import { showNotification } from '@/store/notificationSlice'
import { getErrorMessage } from '@/utils/getErrorMesage'
import { Job } from '@/app_modules/User/components/Jobs'
import { getCurrentTimestamp } from '@/Logics/DateFunc'
import { generateUniqueString } from '@/Logics/date'
import { AddData } from '@/Logics/addData'
import { collection } from 'firebase/firestore'
import { db } from '@/firebase.config'

const CreateJobScreen = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [images, setImages] = useState<string[]>([])
  const [loading, setLoading] = useState(false);
  const [wait,setWait]=useState<boolean>(false);

  // Pick single image and add to images array
  const pickImage = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()
      if (!permissionResult.granted) {
        Alert.alert('Permission required', 'Please grant permission to access photos.')
        return
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        quality: 0.7,
      })

      if (!result.canceled) {
        // result.assets is an array (new API), map uris
        const uris = result.assets.map(asset => asset.uri)
        setImages(prev => [...prev, ...uris])
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image.')
      console.error(error)
    }
  }

  // Remove image at index
  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
  }
const dispatch=useDispatch();
  const submitJob = async () => {
    if (!title.trim()) {
      Alert.alert('Validation', 'Please enter a title.')
      return
    }
    if (!description.trim()) {
      Alert.alert('Validation', 'Please enter a description.')
      return
    }
    if (images.length === 0) {
      Alert.alert('Validation', 'Please upload at least one image.')
      return
    }
try{
    setLoading(true)
    // TODO: Upload images and save job data to backend / Firebase

      let img=[];
      for (let i = 0; i < images.length; i++) {
        const element = images[i]
        const {url}=await uploadImage(element);
        img.push(url);
      }
const job:Job={
createdAt:getCurrentTimestamp(),
descriptions:description,
title,
updatedAt:getCurrentTimestamp(),
id:generateUniqueString(10),
images:img
}
const send_Data=await AddData(collection(db,"Jobs"),job);

      setTitle('')
      setDescription('')
      setImages([])
    dispatch(showNotification({
      message:"Job created successfully",
      type:"success"
    }));

    }
    catch(err:any){
dispatch(showNotification({
  message:getErrorMessage(err),
  type:"error"
}))
    }
    finally{
      setImages([]);
      setLoading(false);
    }

  }

  return (
    <>
      <Header title="Create Job" />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.label}>Job Title</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter job title"
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>Job Description</Text>
        <TextInput
          style={[styles.input, { height: 100 }]}
          placeholder="Enter job description"
          multiline
          value={description}
          onChangeText={setDescription}
        />

        <Text style={styles.label}>Job Images</Text>
        <View style={styles.imagesContainer}>
          {images.map((uri, idx) => (
            <View key={idx} style={styles.imageWrapper}>
              <Image source={{ uri }} style={styles.image} />
              <TouchableOpacity
                style={styles.removeBtn}
                onPress={() => removeImage(idx)}
              >
                <Text style={styles.removeBtnText}>×</Text>
              </TouchableOpacity>
            </View>
          ))}

          <TouchableOpacity style={styles.addImageBtn} onPress={pickImage}>
            <Text style={styles.addImageText}>Add Image</Text>
          </TouchableOpacity>
        </View>

<View style={{padding:10}}>
        <TouchableOpacity
          style={[styles.submitBtn, loading && { backgroundColor: '#ccc' }]}
          onPress={submitJob}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.submitBtnText}>{wait? "please wait...":"Create Job"}</Text>
          )}
        </TouchableOpacity>

</View>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 6,
    fontSize: 16,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  imagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 30,
  },
  imageWrapper: {
    position: 'relative',
    marginRight: 12,
    marginBottom: 12,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  removeBtn: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#f44336',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 18,
  },
  addImageBtn: {
    width: 100,
    height: 100,
    display:'flex',
    
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#aaa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addImageText: {
    fontSize: 14,
    color: '#555',
  },
  submitBtn: {
    backgroundColor: '#2196f3',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
})

export default CreateJobScreen
