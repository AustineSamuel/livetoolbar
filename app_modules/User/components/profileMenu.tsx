import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Ionicons, MaterialCommunityIcons, Feather, MaterialIcons } from '@expo/vector-icons';
import useUser from '@/hooks/useUser';
import BR from '@/utils/BR';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setUser } from '@/store/slices';
import { useDispatch } from 'react-redux';
import { router } from 'expo-router';
import colors from '@/constants/Colors';
import * as LINKING from 'expo-linking';
interface MenuItem {
  label: string;
  icon: React.ReactNode;
  onPress: () => void;
}

interface Props {
  isSideNav?: boolean;
}

export default function ProfileMenu({ isSideNav = false }: Props) {
  const user=useUser();
  const dispatch=useDispatch();
  const items: MenuItem[] = [
    { label: 'Edit Personal Info', icon: <FontAwesome name="user" size={20} />, onPress: () => {
      router.push("/screens/editProfileInfo")
    } },
   
    { label: 'Bank Account', icon: <FontAwesome name="bank" size={20} />, onPress: () => {
      router.push("/screens/fundwallet")
    } },
    { label: 'Admin', icon: <FontAwesome name="sort-amount-desc" size={20} />, onPress: () => {
      router.push("/screens/admin");
    } },
    // { label: 'Verification', icon: <MaterialCommunityIcons name="shield-check" size={20} />, onPress: () => {} },
    // { label: 'Pin and Biometric', icon: <MaterialIcons name="fingerprint" size={20} />, onPress: () => {} },
    { label: 'Refer a friend/family', icon: <MaterialCommunityIcons name="account-group-outline" size={20} />, onPress: () => {
      router.push("/screens/referAFriend")
    } },
    { label: 'Become a Provider', icon: <Feather name="user-plus" size={20} />, onPress: () => {
      router.push("/screens/ApplyAsServiceProvider")
    } },
    { label: 'FAQ', icon: <FontAwesome name="question-circle-o" size={20} />, onPress: () => {
      router.push("/screens/faq")
    } },
    { label: 'Privacy Policy', icon: <Feather name="lock" size={20} />, onPress: () => {
      router.push("/screens/privacyPolicy")
    } },
    { label: 'Support', icon: <Ionicons name="chatbubble-ellipses-outline" size={20} />, onPress: () => {} },
    { label: 'Terms And Condition', icon: <Feather name="file-text" size={20} />, onPress: () => {
      router.push("/screens/terms")
    } },
    { label: 'Delete account', icon: <MaterialCommunityIcons name="delete-outline" size={20} />, onPress: () => {router.push("/screens/deleteAccount")} },
  ];

  return (
    <ScrollView style={[styles.container,{marginTop:isSideNav? -60:0}]}>
      <View style={styles.header}>
        <Image
          source={{ uri: user?.photo||"https://img.icons8.com/?size=100&id=13042&format=png&color=000000"}} // Replace with your image
          style={styles.avatar}
        />
        <View style={styles.userInfo}>
          <Text style={styles.name}>{user?.username}</Text>
          {/* <View style={styles.tierRow}>
            <View style={styles.tierBadge}>
              <Text style={styles.tierText}>Tier 0</Text>
            </View>
            <Text style={styles.rating}>Ratings: 3 ⭐</Text>
          </View> */}
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '50%' }]} />
          </View>
          <Text style={styles.progressText}>50% COMPLETE</Text>
        </View>
        <TouchableOpacity onPress={()=>{
          LINKING.openURL("https://wa.me/2348135170922")
        }}  style={styles.chatBtn}>
          <Ionicons name="logo-whatsapp" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Menu Items */}
      {items.map((item, index) => (
        <TouchableOpacity key={index} style={styles.item} onPress={item.onPress}>
          <View style={styles.iconLabel}>
            {item.icon}
            <Text style={styles.label}>{item.label}</Text>
          </View>
          {!isSideNav && (
            <FontAwesome name="angle-right" size={20} color="#999" />
          )}
        </TouchableOpacity>
      ))}

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.version}>LifeToolBar - Customer Version 1.0.84</Text>
        <TouchableOpacity onPress={async ()=>{
await AsyncStorage.clear();
dispatch(setUser(null));
// router.replace("/screens/login");
router.push("/screens/oboarding");
        }} style={styles.logout}>
          <FontAwesome name="sign-out" size={20} color="red" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
      <BR height={50}/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    backgroundColor:colors.primaryColor,
    padding: 16,
    borderRadius: 12,
    gap:5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  userInfo: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  tierRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  tierBadge: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginRight: 8,
  },
  tierText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#8000ff',
  },
  rating: {
    color: 'white',
    fontSize: 12,
  },
  progressBar: {
    marginTop: 8,
    height: 5,
    backgroundColor: 'white',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#00ff99',
  },
  progressText: {
    marginTop: 4,
    color: 'white',
    fontSize: 10,
  },
  chatBtn: {
    backgroundColor: '#25D366',
    borderRadius: 25,
    padding: 8,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 22,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    justifyContent: 'space-between',
  },
  iconLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    marginLeft: 12,
    fontSize: 16,
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
  version: {
    fontSize: 12,
    color: '#666',
    marginBottom: 10,
  },
  logout: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutText: {
    marginLeft: 8,
    color: 'red',
    fontWeight: 'bold',
  },
});
