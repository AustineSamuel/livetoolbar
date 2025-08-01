import { View, Text } from 'react-native'
import React from 'react'
import Header from '@/utils/Header'
import Services from '@/app_modules/User/components/home/services'

const ServicesScreen = () => {
  return (<>
  <Header title={`Manage Services `}/>
 <Services isAdmin/>

    </>
  )
}

export default ServicesScreen