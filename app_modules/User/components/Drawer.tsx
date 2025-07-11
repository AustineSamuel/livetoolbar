import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SidebarContent from './SideBarContent';
import TabLayout from './TapLayout';

const Drawer = createDrawerNavigator();

export default function DrawerLayout() {
  return (
    <Drawer.Navigator
    
      screenOptions={{
        headerShown: false,
      }}
      
      drawerContent={(props) => <SidebarContent {...props}  />}
    >
      <Drawer.Screen name="Tabs" component={TabLayout} />
    </Drawer.Navigator>
  );
}
