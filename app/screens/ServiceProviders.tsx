import ServiceProvidersScreen from '@/app_modules/screens/ServiceProviders'
import { service } from '@/app_modules/static-data/services'
import Header from '@/utils/Header'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React from 'react'
import { View } from 'react-native'

const ServiceProviders:React.FC = () => {
  const { item } = useLocalSearchParams();

  const parsedItem:service = item ? JSON.parse(item as string) : null;
  return (
    <ServiceProvidersScreen/>
  )
}

export default ServiceProviders
