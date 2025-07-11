import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons"; // for social icons
import { router } from "expo-router";
import colors from "@/constants/Colors";

export default function LoginScreen({ navigation }:{navigation:any}) {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>LiveToolBar</Text>

      <Text style={styles.title}>Login to your livetoolbar account</Text>

      <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#aaa" />
      <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#aaa" secureTextEntry />

      <TouchableOpacity onPress={()=>{
        router.push("/(tabs)")
      }} style={styles.button}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>


      

      <TouchableOpacity onPress={() => router.push("/screens/singup")}>
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
});
