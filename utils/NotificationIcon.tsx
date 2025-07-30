import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import colors from '@/constants/Colors';

export default function NotificationIcon({ count = 0, onPress,icon }:{count?: number, onPress: () => void,icon?:React.ReactNode}) {
  const router = useRouter();
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      {icon || <Ionicons style={styles.icon} name="notifications-outline" size={28} color="black" />}

      {count > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{count > 99 ? '99+' : count}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    padding: 8,
    borderRadius: 20,
    width:45,
    height:45,
    borderWidth: 1,
    borderColor: colors?.lightGray,
  },
  icon: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    right: 2,
    top: 2,
    backgroundColor: 'red',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
