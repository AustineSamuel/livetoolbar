import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { AntDesign, FontAwesome5, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import colors from '@/constants/Colors';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
           tabBarActiveTintColor: '#1f6f8b', // Active color
        tabBarInactiveTintColor: '#999', // Inactive color
        tabBarStyle: {
          backgroundColor: '#fff',
          paddingBottom: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
           tabBarIcon:({focused})=>{
            return <Ionicons name={`home${focused ? "":"-outline"}`} style={{color:colors.primaryColorDarker}} size={20}/>
           }
        }}
        
      />

   <Tabs.Screen
        name="bookings"
        options={{
          title: 'Bookings',
           tabBarIcon:({focused})=>{
            return <MaterialIcons name={`work${focused ? "":"-outline"}`}  style={{color:colors.primaryColorDarker}}  size={20}/>
           }
        }}
        
      />


   

         <Tabs.Screen
        name="wallet"
        options={{
          title: 'Wallet',
           tabBarIcon:({focused})=>{
            return <Ionicons name={`wallet${focused ? "":"-outline"}`}  style={{color:colors.primaryColorDarker}}  size={20}/>
           }
        }}
        
      />

            <Tabs.Screen
        name="messages"
        options={{
          title: 'Messages',
           tabBarIcon:({focused})=>{
            return <MaterialCommunityIcons name={`message-processing${focused ? "":"-outline"}`}  style={{color:colors.primaryColorDarker}}  size={20}/>
           }
        }}
        
      />

      {/* Add more tabs if needed */}
    </Tabs>
  );
}
