import { View, Text } from 'react-native'
import React from 'react'
import Header from '@/utils/Header'
import Services from '@/app_modules/User/components/home/services'

const AllServices = () => {
  return (<>
  <Header title={`Services`}/>
    <Services/>
    </>
  )
}

export default AllServices