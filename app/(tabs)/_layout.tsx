import DrawerLayout from "@/app_modules/User/components/Drawer";

export default function RootLayout() {
  return <DrawerLayout />;
}




// import React from 'react';
// import FontAwesome from '@expo/vector-icons/FontAwesome';
// import { Link, Tabs } from 'expo-router';
// // You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
// function TabBarIcon(props: {
//   name: React.ComponentProps<typeof FontAwesome>['name'];
//   color: string;
// }) {
//   return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
// }

// export default function TabLayout() {

//   return (
//     <Tabs
//       screenOptions={{
//         headerShown: false,
//       }}>
//       <Tabs.Screen
//         name="index"
//         options={{
//           title: 'Home'
//         }}
//       />
  
//     </Tabs>
//   );
// }
