import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons"; // for social icons
import { router } from "expo-router";
import colors from "@/constants/Colors";
import { useDispatch } from "react-redux";
import { showNotification } from "@/store/notificationSlice";
import { getErrorMessage } from "@/utils/getErrorMesage";
import { docQr } from "@/Logics/docQr";
import { setUser } from "@/store/slices";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { replaceUndefined } from "@/utils/funcs";
import BR from "@/utils/BR";
export function isEmail(value: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
}

export default function LoginScreen({ navigation }:{navigation:any}) {
  const dispatch=useDispatch();
  const [username,setUsername]=useState<string>("");
  const [password,setPassword]=useState<string>("");
const [error,setError]=useState<string>("");
const [loading,setLoading]=useState<boolean>(false);
  const submit=async ()=>{
    try{
      if(username.trim().length<2 && password.trim().length <2)return setError("Please enter login details")
      setLoading(true);
      const searchByEmail=await docQr("Users",{
              whereClauses:[
                {
                  field:"email",
                  operator:"==",
                  value:username
                },
                {
                  field:"password",
                  operator:"==",
                  value:password
                }
              ]
            })
            const searchByEmailUser=searchByEmail?.[0];
if(searchByEmailUser && searchByEmailUser!==undefined){
  dispatch(setUser(searchByEmailUser));
  await AsyncStorage.setItem("User",JSON.stringify(searchByEmailUser))
  dispatch(showNotification({
    message:"Login successful",
    type:"success"
  }))
 return router.push("/(tabs)")
}

//search by user name 
    const searchByUsername=await docQr("Users",{
              whereClauses:[
                {
                  field:"username",
                  operator:"==",
                  value:username
                },
                {
                  field:"password",
                  operator:"==",
                  value:password
                }
              ]
            })
            const searchByUsernameUser=searchByUsername?.[0];
if(searchByUsernameUser && searchByUsernameUser!==undefined){

  dispatch(setUser(searchByUsernameUser))
  await AsyncStorage.setItem("User",JSON.stringify(searchByUsernameUser))
  dispatch(showNotification({
    message:"Login successful",
    type:"success"
  }))
  return router.push("/(tabs)")
}
else{
    dispatch(showNotification({
    message:"Incorrect login details",
    type:"error"
  }))
  setError("Incorrect login details");
}

    }
    catch(err:any){
      const errMessage=getErrorMessage(err);
dispatch(showNotification({
  message:errMessage,
  type:"error"
}))
setError(errMessage);

    }
    finally{
    setLoading(false);
    }
  }
  return (
    <View style={styles.container}>

<View>
  <Image style={{width:150,height:150,borderRadius:75}} source={require("../../assets/images/icon.png")}/>
</View>

      <Text style={styles.logo}>LifeToolBar</Text>

      <Text style={styles.title}>Login to your lifetoolbar account</Text>

      <TextInput onChangeText={setUsername} style={styles.input} placeholder="Email or username" placeholderTextColor="#aaa" />
      <TextInput onChangeText={setPassword} style={styles.input} placeholder="Password" placeholderTextColor="#aaa" secureTextEntry />
{error && <Text style={styles.errorText}>{error}</Text>}
 <TouchableOpacity style={{marginTop:-10,width:"100%"}} onPress={() => router.push("/screens/forgotten-password")}>
        <Text style={{textAlign:"left",width:"100%"}}>Forgotten password</Text>
      </TouchableOpacity>
<BR height={5}/>
      <TouchableOpacity  disabled={loading} onPress={submit} style={[styles.button,{opacity:loading ? 0.6:1}]}>
        <Text style={styles.buttonText}>{loading ? "Please wait...":"Sign In"}</Text>
      </TouchableOpacity>


      

      <TouchableOpacity onPress={() => router.push("/screens/signup")}>
        <Text style={styles.link}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", padding: 20, backgroundColor: "#fff" },
  logo: { fontSize: 32, fontWeight: "bold", color: "#003399", marginBottom: 10 },
  title: { fontSize: 18, marginBottom: 20 },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  button: {
    backgroundColor:colors?.primaryColor,
    paddingVertical: 15,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
  socialContainer: { flexDirection: "row", marginTop: 10 },
  socialIcon: { marginHorizontal: 10 },
  link: { marginTop: 20, color: "#003399", textDecorationLine: "underline" },
  errorText: { color: "red", alignSelf: "flex-start", marginBottom: 10,fontSize:10,fontStyle:"italic" },

});
