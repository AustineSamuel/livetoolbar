import * as SecureStorage from "expo-secure-store";
export const secureStorage= SecureStorage;
const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

const ColorsLightAndDark= {
  light: {
  
    text: '#111010',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
    lightGray:"#ece4e4",
    white:"white",
    black:"black"
  },
  dark: {
    text: '#fff',
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
    lightGray:"#1c1b1b",
    white:"black",
    black:"white"

  },
};


export const colors={
  ...(ColorsLightAndDark[(SecureStorage.getItem("mode")||"light") as "light" |"dark"]),
  primaryColor:"#63C8FF",
  primaryColorDarker:"#154f6e",
  secondaryColor:"#FEEBF6",
}

export default colors;