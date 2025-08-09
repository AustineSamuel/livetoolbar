import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import Header from '@/utils/Header'
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { db } from '@/firebase.config'
import colors from '@/constants/Colors'
import * as ImagePicker from 'expo-image-picker'
import Modal from 'react-native-modal'
import { AddData } from '@/Logics/addData'
import { getCurrentTimestamp } from '@/Logics/DateFunc'
import { notification } from '@/app_modules/User/screens/notification'
import { generateUniqueString } from '@/Logics/date'
import { useDispatch } from 'react-redux'
import { showNotification } from '@/store/notificationSlice'
import { uploadImage } from '@/lib/upload'

export interface User {
  username: string
  fullname: string
  email: string
  password: string
  NIN: string
  photo: string
  createdAt: string
  updated: string
  passwordChangedAt: string
  recentPasswords: string[]
  userId: string
  balance: number
  balance_before: number
  balance_updatedAt: string
  docId?: string
}

const UsersScreen = () => {
  const [users, setUsers] = useState<User[]>([])
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [searchText, setSearchText] = useState('')
  const [loading, setLoading] = useState(true)

  // Modal state
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [notifTitle, setNotifTitle] = useState('')
  const [notifMessage, setNotifMessage] = useState('')
  const [notifImage, setNotifImage] = useState<string | null>(null)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)
        const usersCol = collection(db, 'Users')
        const usersSnapshot = await getDocs(usersCol)
        const usersList = usersSnapshot.docs.map(docSnap => ({
          ...(docSnap.data() as User),
          docId: docSnap.id,
        }))
        setUsers(usersList)
        setFilteredUsers(usersList)
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch users')
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchUsers()
  }, [])

  useEffect(() => {
    if (!searchText.trim()) {
      setFilteredUsers(users)
      return
    }
    const lower = searchText.toLowerCase()
    const filtered = users.filter(
      u =>
        u.username.toLowerCase().includes(lower) ||
        u.fullname.toLowerCase().includes(lower) ||
        u.email.toLowerCase().includes(lower)
    )
    setFilteredUsers(filtered)
  }, [searchText, users])

  const handleDelete = (docId?: string) => {
    if (!docId) return
    Alert.alert('Delete User', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteDoc(doc(db, 'Users', docId))
            const updatedUsers = users.filter(u => u.docId !== docId)
            setUsers(updatedUsers)
            setFilteredUsers(updatedUsers)
            Alert.alert('Success', 'User deleted successfully')
          } catch (error) {
            Alert.alert('Error', 'Failed to delete user')
            console.error(error)
          }
        },
      },
    ])
  }

  const openNotificationModal = (user: User) => {
    setSelectedUser(user)
    setNotifTitle('')
    setNotifMessage('')
    setNotifImage(null)
    setModalVisible(true)
  }

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    })
    if (!result.canceled) {
      setNotifImage(result.assets[0].uri)
    }
  }

  const [sending,setSending]=useState<boolean>(false);
  const dispatch=useDispatch();
  const sendNotification = async () => {
    if (!notifTitle.trim() || !notifMessage.trim()) {
      Alert.alert('Error', 'Please fill in all fields')
      return
    }
    try{
      setSending(true);
      // Here you can send to Firebase Cloud Messaging or backend
      const {url}=await uploadImage(notifImage as string);
      const notification:notification={
        title: notifTitle,
        message: notifMessage,
        image: url,
        userId: selectedUser?.userId as string,
        sentAt: getCurrentTimestamp(),
        id: generateUniqueString(10)
      }

      const _=await AddData(collection(db, 'Notifications'),notification);
      setNotifTitle('')
      setNotifMessage('')
      setNotifImage(null);
      setModalVisible(false);
      dispatch(showNotification({
        message: 'Notification sent successfully',
        type: 'success'
      }));
    } catch (error) {
      dispatch(showNotification({
        message: 'Failed to send notification',
        type: 'error'
      }))
      console.error(error)
    }
    finally {
      setSending(false);
    }
  }

  const renderUser = ({ item }: { item: User }) => (
    <View style={styles.userCard}>
      <Image
        source={{
          uri:
            item.photo ||
            'https://img.icons8.com/?size=100&id=13042&format=png&color=000000',
        }}
        style={styles.photo}
      />
      <View style={{ flex: 1, marginLeft: 12 }}>
        <Text style={styles.username}>{item.username}</Text>
        <Text style={styles.fullname}>{item.fullname}</Text>
        <Text style={styles.email}>{item.email}</Text>
      </View>

      <View>
        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={() => handleDelete(item.docId)}
        >
          <Text style={styles.deleteBtnText}>Delete</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.deleteBtn, { marginTop: 3, backgroundColor: colors.success }]}
          onPress={() => openNotificationModal(item)}
        >
          <Text style={styles.deleteBtnText}>Notify</Text>
        </TouchableOpacity>
      </View>
    </View>
  )

  return (
    <>
      <Header title="Manage Users" />
      <View style={styles.container}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by username, fullname or email"
          value={searchText}
          onChangeText={setSearchText}
          autoCorrect={false}
          autoCapitalize="none"
        />

        {loading ? (
          <ActivityIndicator size="large" color="#000" style={{ marginTop: 20 }} />
        ) : filteredUsers.length === 0 ? (
          <Text style={{ marginTop: 20, textAlign: 'center' }}>No users found.</Text>
        ) : (
          <FlatList
            data={filteredUsers}
            keyExtractor={item => item.docId || item.userId}
            renderItem={renderUser}
            contentContainerStyle={{ paddingBottom: 100 }}
          />
        )}
      </View>

      {/* Bottom Sheet Modal */}
      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        style={{ justifyContent: 'flex-end', margin: 0 }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.modalContent}
        >
          <Text style={styles.modalTitle}>Send Notification</Text>
          <TextInput
            placeholder="Title"
            style={styles.input}
            value={notifTitle}
            onChangeText={setNotifTitle}
          />
          <TextInput
            placeholder="Message"
            style={[styles.input, { height: 80 }]}
            value={notifMessage}
            onChangeText={setNotifMessage}
            multiline
          />
          <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
            {notifImage ? (
              <Image source={{ uri: notifImage }} style={styles.previewImage} />
            ) : (
              <Text style={{ color: colors.primaryColor }}>+ Add Image</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity disabled={sending} style={[styles.sendBtn,{opacity:sending?0.5:1}]} onPress={sendNotification}>
            <Text style={styles.sendBtnText}>{sending ? "Sending..." : "Send"}</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: colors.white,
    paddingTop: 12,
  },
  searchInput: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  photo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ccc',
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  fullname: {
    color: '#555',
  },
  email: {
    color: '#888',
    fontSize: 12,
  },
  deleteBtn: {
    backgroundColor: '#ff4444',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    textAlign: 'center',
  },
  deleteBtnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContent: {
    backgroundColor: colors.white,
    padding: 16,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  input: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    height: 40,
  },
  imagePicker: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  previewImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  sendBtn: {
    backgroundColor: colors.primaryColor,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  sendBtnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
})

export default UsersScreen
