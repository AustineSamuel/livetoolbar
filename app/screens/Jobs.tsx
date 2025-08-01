import { View, Text } from 'react-native'
import React from 'react'
import Header from '@/utils/Header'
import { JobsScreen } from '@/app_modules/User/components/Jobs'
import MyButton from '@/utils/button'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import colors from '@/constants/Colors'
import { router } from 'expo-router'

const Jobs = () => {
  return (
   <>
   <Header title={`Jobs `}/>
   <JobsScreen isAdmin/>
   <MyButton onPress={()=>{
    router.push("/screens/createJob");
   }} style={{backgroundColor:colors.primaryColorDarker,borderRadius:10}}>
    <Text style={{color:colors.white}}>Create Job</Text></MyButton>
   </>
  )
}

export default Jobs