import * as SecureStorage from "expo-secure-store";
export const secureStorage= SecureStorage;
const tintColorLight = 'hsla(182, 64%, 52%, 1)';
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
  primaryColor:"hsla(182, 64%, 52%, 1)",
  grey:"#9997ab",
  primaryColorDarker:"hsla(201, 64%, 16%, 1)2, 64%, 52%, 1)",
  secondaryColor:"#FEEBF6",
  danger:'#bc2222'
}

export default colors;