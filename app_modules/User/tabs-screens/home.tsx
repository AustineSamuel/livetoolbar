import { View, Text, FlatList } from 'react-native'
import React from 'react'
import HomeHeader from '../components/HomeHeader'
import Services from '../components/home/services'
import BR from '@/utils/BR'
import HomeWalletCard from '../components/home-wallet-card'
import { screenPadding } from '@/glob/style'
import Jobs from '../components/home/jobs'

const Home = () => {
  return (
    <>
    <HomeHeader/>
    <FlatList data={[1]} renderItem={()=>{
      return <>
    
    <View style={{flex:1}}>
    <View style={{padding:screenPadding}}>
<HomeWalletCard/>
    </View>

<View style={{padding:screenPadding}}>
<Services/>
</View>

<View style={{padding:screenPadding}}>

<Jobs/>
</View>
    </View>
      
      </>
    }}/>
    </>

  )
}

export default Home