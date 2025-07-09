import colors from '@/constants/Colors';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Header:React.FC<{leftBtn?:React.ReactNode,title?:string| React.ReactNode,style?:any,onBack?:()=>void,headerTitleStyle?:React.CSSProperties | any}> = ({ title,style,onBack,headerTitleStyle,leftBtn }) => {
  const router = useRouter();

  return (
    <View style={[styles.header, style]}>
      <TouchableOpacity style={styles.backButton} onPress={() =>onBack? onBack(): router.canGoBack()&&router.back()}>
        <Ionicons name={"arrow-back-outline"} color={colors.black} size={25} />
      </TouchableOpacity>
     {typeof title === 'string' ? <Text style={[styles.headerTitle,headerTitleStyle ? headerTitleStyle:{}]}>{title}</Text> : title} 
     
      {leftBtn ? leftBtn : <View style={styles.spacer} />}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors?.white,
    paddingHorizontal: 20,
    paddingVertical: 10,
    display:'flex',
//    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  backButton: {
    backgroundColor: 'white',
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#EEEEEE",
  },
  spacer: {
    width: 50, // This is to take up space on the right
  },
});

export default Header;
