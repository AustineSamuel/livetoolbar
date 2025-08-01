import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import Header from '@/utils/Header'
import {  router, useLocalSearchParams } from 'expo-router'

interface Job {
  title: string
  images: string[]
  descriptions: string
  createdAt: string
  updatedAt: string
}

const ApplyJobs = () => {
  const params = useLocalSearchParams()
  const [job, setJob] = useState<Job | null>(null)
  const [coverLetter, setCoverLetter] = useState('')

  useEffect(() => {
    if (params?.job) {
      try {
        const jobObj = JSON.parse((params?.job as any)||"null");
        setJob(jobObj)
      } catch {
        Alert.alert('Error', 'Failed to load job details')
      }
    }
  }, [params?.job])

  const submitApplication = () => {
    if (!coverLetter.trim()) {
      Alert.alert('Validation', 'Please write a cover letter.')
      return
    }
    // TODO: handle apply logic here (upload to backend / firebase)
    Alert.alert('Success', 'Application submitted!')
    setCoverLetter('')
    router.back()
  }

  if (!job) {
    return (
      <View style={styles.center}>
        <Text>Loading job details...</Text>
      </View>
    )
  }

  return (
    <>
      <Header title={`Apply: ${job.title}`} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>{job.title}</Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imagesScroll}>
            {job.images.map((uri, i) => (
              <Image key={i} source={{ uri }} style={styles.image} />
            ))}
          </ScrollView>

          <Text style={styles.description}>{job.descriptions}</Text>

          <Text style={styles.label}>Write your cover letter</Text>
          <TextInput
            style={styles.coverInput}
            multiline
            numberOfLines={6}
            placeholder="Write your cover letter here..."
            value={coverLetter}
            onChangeText={setCoverLetter}
          />

          <TouchableOpacity style={styles.submitBtn} onPress={submitApplication}>
            <Text style={styles.submitBtnText}>Submit Application</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  imagesScroll: {
    marginBottom: 12,
  },
  image: {
    width: 120,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    color: '#444',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 6,
  },
  coverInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 24,
    textAlignVertical: 'top',
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
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default ApplyJobs
