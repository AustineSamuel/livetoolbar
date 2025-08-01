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
} from 'react-native'
import Header from '@/utils/Header'
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { db } from '@/firebase.config' // Adjust to your Firebase config import
import colors from '@/constants/Colors'

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

  // Fetch users from Firebase on mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)
        const usersCol = collection(db, 'Users') // Make sure your collection name
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

  // Filter users on searchText change
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
    Alert.alert(
      'Delete User',
      'Are you sure you want to delete this user?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteDoc(doc(db, 'users', docId))
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
      ]
    )
  }

  const renderUser = ({ item }: { item: User }) => (
    <View style={styles.userCard}>
      <Image source={{ uri: item.photo||"https://img.icons8.com/?size=100&id=13042&format=png&color=000000" }} style={styles.photo} />
      <View style={{ flex: 1, marginLeft: 12 }}>
        <Text style={styles.username}>{item.username}</Text>
        <Text style={styles.fullname}>{item.fullname}</Text>
        <Text style={styles.email}>{item.email}</Text>
      </View>
      <TouchableOpacity
        style={styles.deleteBtn}
        onPress={() => handleDelete(item.docId)}
      >
        <Text style={styles.deleteBtnText}>Delete</Text>
      </TouchableOpacity>
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
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor:colors.white,
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
  },
  deleteBtnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
})

export default UsersScreen
