import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Header from '@/utils/Header';
import { Ionicons, MaterialIcons, Entypo } from '@expo/vector-icons'; // You can add more as needed
import { router } from 'expo-router';

const AdminScreen = () => {
  const options = [
    { title: 'Edit Services', icon: <Ionicons name="construct" size={24} color="#fff" /> ,onPress:()=>{
        router.push("/screens/ManageServices");
    }},
    { title: 'Users', icon: <Ionicons name="people" size={24} color="#fff" />,onPress:()=>{
      router.push("/screens/Users")
    } },
    { title: 'Jobs', icon: <Ionicons name="briefcase" size={24} color="#fff" />,onPress:()=>{
      router.push("/screens/Jobs")
    } },
      { title: 'Create Job', icon: <Ionicons name="briefcase-sharp" size={24} color="#fff" />,onPress:()=>{
      router.push("/screens/createJob")
    } },
    { title: 'Sourcing Services', icon: <MaterialIcons name="design-services" size={24} color="#fff" />,
  onPress:()=>{
    router.push("/screens/admin.worksneeded")
  }},
    { title: 'Manage Providers', icon: <Ionicons name="person-add-sharp" size={24} color="#fff" /> ,
  onPress:()=>{
    router.push("/screens/manageProvders")
  }},
  ];

  return (
    <>
      <Header title="Admin Settings" />
      <View style={styles.container}>
        <Text style={styles.title}>Quick Actions</Text>
        <View style={styles.grid}>
          {options.map((item, index) => (
            <TouchableOpacity onPress={()=>{
                if(item.onPress)item.onPress()
            }} key={index} style={styles.card}>
              {item.icon}
              <Text style={styles.cardText}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: 'hsla(182, 64%, 52%, 1)',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default AdminScreen;
