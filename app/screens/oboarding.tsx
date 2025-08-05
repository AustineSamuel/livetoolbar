import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native'
import { useRouter } from 'expo-router'
import PagerView from 'react-native-pager-view';
import colors from '@/constants/Colors';
const OnboardingScreen = () => {
  const router = useRouter()
const pages = [
  {
    name: "Endless Services",
    title: "One Marketplace",
  },
  {
    name: "Find Work Easily",
    title: "Get Hired Instantly",
  },
  {
    name: "Hire Trusted Experts",
    title: "Post Jobs with Confidence",
  },
]


  return (
    <>
    <SafeAreaView style={styles.container}>
      <StatusBar   translucent={false} barStyle="light-content"  backgroundColor="#000" />
      
      {/* Top Empty Space - for future logo/image if needed */}
      <View style={styles.topSection}></View>

      {/* Text */}
      <PagerView style={styles.container} initialPage={0}>
   {pages.map((e,i)=>{
      return <View key={i} style={styles.middleSection}>
        <Text style={styles.title}>{e.title}</Text>
        <Text style={styles.title}>{e.name}</Text>
      </View>
   })}

</PagerView>
      {/* Dots Indicator */}
      <View style={styles.dots}>
        <View style={[styles.dot, styles.activeDot]} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>

      {/* Buttons */}
      <View style={styles.buttonSection}>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => router.push('/screens/login')}
        >
          <Text style={styles.loginText}>Login to your account</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/screens/signup')}>
          <Text style={styles.registerText}>Register New Account</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
    </>
  )
}

export default OnboardingScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // or your app theme color
    justifyContent: 'space-between',
  },
  topSection: {
    flex: 2,
  },
  middleSection: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#444',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: colors.primaryColor, // Your primary
  },
  buttonSection: {
    paddingHorizontal: 24,
    marginBottom: 40,
  },
  loginBtn: {
    backgroundColor: colors.primaryColor, //r your app's primary color
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 16,
  },
  loginText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerText: {
    color: '#aaa',
    fontSize: 14,
    textAlign: 'center',
  },
})
