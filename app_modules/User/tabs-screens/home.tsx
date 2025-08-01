import { View, Text, FlatList, TouchableHighlight } from 'react-native'
import React from 'react'
import HomeHeader from '../components/HomeHeader'
import Services from '../components/home/services'
import BR from '@/utils/BR'
import HomeWalletCard from '../components/home-wallet-card'
import { screenPadding } from '@/glob/style'
import Jobs from '../components/home/jobs'
import colors from '@/constants/Colors'
import { router } from 'expo-router'

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
<Services max={12}/>
<TouchableHighlight underlayColor={colors?.lightGray} onPress={()=>{
  router.push("/screens/AllServices")
}} style={{padding:10,marginTop:8}}><Text style={{color:colors.black,textAlign:'center'}}>See all</Text></TouchableHighlight>
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