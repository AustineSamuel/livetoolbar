import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import ProfileMenu from './profileMenu';

export default function SidebarContent(props: any) {
  return (
    <DrawerContentScrollView {...props}>
    <ProfileMenu isSideNav={true}/>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  link: {
    fontSize: 18,
    marginVertical: 10,
  },
});
