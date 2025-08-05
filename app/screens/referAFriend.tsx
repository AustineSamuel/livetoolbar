import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Share,
  Alert,
  Image,
} from 'react-native'
import Header from '@/utils/Header'
import * as Clipboard from 'expo-clipboard'
import LottieView from 'lottie-react-native'
import { Ionicons } from '@expo/vector-icons'
import useUser from '@/hooks/useUser'
import BR from '@/utils/BR'
import { useDispatch } from 'react-redux'
import { showNotification } from '@/store/notificationSlice'
import colors from '@/constants/Colors'


const ReferAFriend: React.FC = () => {
    const user=useUser();
    const dispatch=useDispatch();
const REFER_LINK = 'https://lifetoolbar.com/invite?ref='+user?.userId
  const copyToClipboard = () => {
    Clipboard.setStringAsync (REFER_LINK)
dispatch(showNotification({message:'Copied! Referral link copied to clipboard.',type:"success"}));
  }

  const shareLink = async () => {
    try {
      await Share.share({
        message: `Join me on lifetoolbar! Use my referral link: ${REFER_LINK}`,
      })
    } catch (error) {
      Alert.alert('Error', 'Could not share the link.')
    }
  }

  return (
    <>
      <Header title="Refer a Friend" />
      <View style={styles.container}>
     <BR height={30}/>
        <Image
          source={require('../../assets/images/share-icon-.png')} // Replace with your Lottie file path
     
          style={{ width: 200, height: 200 }}
        />

        <Text style={styles.title}>Invite your friends</Text>
        <Text style={styles.subtitle}>
          Share your referral link to earn rewards when friends join.
        </Text>

        <View style={styles.linkBox}>
          <Text style={styles.linkText} numberOfLines={1}>
            {REFER_LINK}
          </Text>
          <TouchableOpacity onPress={copyToClipboard}>
            <Ionicons name="copy-outline" size={22} color="#a020f0" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.shareBtn} onPress={shareLink}>
          <Text style={styles.shareBtnText}>Share Link</Text>
        </TouchableOpacity>
      </View>
    </>
  )
}

export default ReferAFriend

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#222',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
    color: '#555',
  },
  linkBox: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 12,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
  },
  linkText: {
    flex: 1,
    color: '#444',
    marginRight: 8,
  },
  shareBtn: {
    backgroundColor:colors.primaryColor,
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 30,
    paddingHorizontal: 40,
  },
  shareBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
})
