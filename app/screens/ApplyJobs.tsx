import React, { useState, useEffect, useCallback } from 'react'
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
import {  router, useFocusEffect, useLocalSearchParams } from 'expo-router'
import { collection } from 'firebase/firestore'
import { db } from '@/firebase.config'
import { AddData } from '@/Logics/addData'
import useUser from '@/hooks/useUser'
import { getCurrentTimestamp } from '@/Logics/DateFunc'
import { JobApplication } from './job_applications'
import { User } from '@/types/user.types'
import { useDispatch } from 'react-redux'
import { showNotification } from '@/store/notificationSlice'
import { getErrorMessage } from '@/utils/getErrorMesage'
import { docQr } from '@/Logics/docQr'
import { WhereClause } from '../../Logics/docQr';
import RenderJobApplicationStatus from '@/app_modules/Vendor/components/JobStatus'

interface Job {
  title: string
  images: string[]
  descriptions: string
  createdAt: string
  id:string,
  updatedAt: string
}

const ApplyJobs = () => {
  const params = useLocalSearchParams()
  const [job, setJob] = useState<Job | null>(null)
  const [coverLetter, setCoverLetter] = useState('')
const [existingApplication,setExistingApplication]=useState<JobApplication>();
const [loading,setLoading]=useState<boolean>(true);
const [error,setError]=useState<string>("");
const init=async(job:Job,userId:string)=>{
  console.log("init called....")
  try{
const _=await docQr("AppliedJobs",{
  whereClauses:[
    {
      field:"uid",
    operator:"==",
    value:userId
    },
    {
      field:"jobId",
      operator:"==",
      value:job?.id
    }
  ]
})
setExistingApplication(_?.[0]);
  }
  catch(err:any){
setError(getErrorMessage(err));
  }
  finally{
setLoading(false);
  }
}
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


const user=useUser();

  useFocusEffect(useCallback(()=>{//check if user aready applied
if(user?.userId && job)init(job,user?.userId||"");
  },[user,job]));

const dispatch=useDispatch();
  const [submitting,setSubmitting]=useState<boolean>(false);
  const submitApplication = async() => {
    if (!coverLetter.trim()) {
      Alert.alert('Validation', 'Please write a cover letter.')
      return
    }
    try{
      const jobApplicationData:JobApplication={
   person:user as User,
    uid:user?.userId||"",
    appliedAt:getCurrentTimestamp(),
    coverLetter,
    jobId:job?.id||"",
    amHired: false
      }
      setSubmitting(true);
    await AddData(collection(db,"AppliedJobs"),jobApplicationData);
    router.back();
    dispatch(showNotification({
      message:"Job Applications submitted successfully",
      type:"success"
    }))
    setCoverLetter('')
    }
    catch(err:any){
    router.back()
    }
    finally{
      setSubmitting(false);
    }
  }
if(existingApplication){
  return <><Header title={"Apply "}/><RenderJobApplicationStatus myApplication={existingApplication}/></>
}
  
  if (!job || loading) {
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

          <TouchableOpacity style={styles.submitBtn} onPress={submitApplication} disabled={submitting}>
            <Text style={styles.submitBtnText}>{submitting ? "please wait...":"Submit Application"}</Text>
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
