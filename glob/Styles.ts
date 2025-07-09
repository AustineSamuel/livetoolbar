import colors from '@/constants/Colors';
import Colors from '@/constants/Colors';
import { StatusBar, StyleSheet } from 'react-native';

export const defaultStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFFFF',
  },
  inputField: {
    height: 44,
    borderWidth: 1,
    borderColor: '#ABABAB',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
  },
  flagImage:{
width:20,
height:20,
objectFit:"contain"
  },
  btn: {
    backgroundColor: Colors.primaryColor,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'mon-b',
  },
  btnIcon: {
    position: 'absolute',
    left: 16,
    width: 24, 
    height: 24
  },
  footer: {
    position: 'absolute',
    height: 100,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopColor: Colors.lightGray,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  label:{
    color:colors?.white,
    fontSize:14
  }
});

export const statusBarHeight=0//StatusBar.currentHeight ? StatusBar.currentHeight-10:0;
export const toastStyles={type:"danger",dangerColor:'red',warningColor:"rgb(255, 165, 0)",successColor:"rgb(0, 128, 0)"};