import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { Provider } from 'react-redux';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { store } from '@/store';
import AnimatedNotification from '@/app_modules/User/components/animatedNotifications';
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [finished,setFinished]=useState<boolean>(false);
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (finished) {
      SplashScreen.hideAsync();
    }
  }, [finished]);

useEffect(()=>{
if(loaded){
  //get user by token
  setTimeout(()=>{
setFinished(true);
  },1000)
}
},[loaded]);
  if (!loaded) {
    return null;
  }
  return <RootLayoutNav />;
}
function RootLayoutNav() {
  return (<>
  <Provider store={store}>
    <SafeAreaProvider>
      <SafeAreaView style={{flex:1}}>
    <AnimatedNotification />
       <Stack screenOptions={{headerShown:false}}>
         <Stack.Screen name="screens/init" options={{ headerShown: false }} />
         <Stack.Screen name="screens/login" options={{ headerShown: false }} />
         <Stack.Screen name="screens/signup" options={{ headerShown: false }} />
        </Stack>
      </SafeAreaView>
    </SafeAreaProvider>
    </Provider>
</>
  );
}
