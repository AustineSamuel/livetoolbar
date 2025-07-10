import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import colors from "@/constants/Colors"; // Make sure colors.primaryColor exists

export default function SignupScreen() {
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState<"Vendor" | "User">("User");

  const [errors, setErrors] = useState<any>({});

  const handleSignup = () => {
    const newErrors: any = {};

    if (!username.trim()) newErrors.username = "Username is required";
    if (!fullname.trim()) newErrors.fullname = "Full name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log({ username, fullname, email, password, type });
      // Example: router.push("/screens/login");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Signup</Text>
      <Text style={styles.title}>Create your livetoolbar account</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#aaa"
        value={username}
        onChangeText={setUsername}
      />
      {errors.username && <Text style={styles.errorText}>{errors.username}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        placeholderTextColor="#aaa"
        value={fullname}
        onChangeText={setFullname}
      />
      {errors.fullname && <Text style={styles.errorText}>{errors.fullname}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
      />
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={type}
          onValueChange={(itemValue: any) => setType(itemValue as "Vendor" | "User")}
          style={styles.picker}
        >
          <Picker.Item label="Am Looking for worker" value="User" />
          <Picker.Item label="I want to work" value="Vendor" />
        </Picker>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/screens/login")}>
        <Text style={styles.link}>Already have an account? Sign in</Text>
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
    marginBottom: 5, // adjusted for error text spacing
  },
  pickerContainer: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 15,
    overflow: "hidden",
  },
  picker: {
    width: "100%",
    height: 50,
  },
  button: {
    backgroundColor: colors.primaryColor,
    paddingVertical: 15,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
  link: { marginTop: 20, color: "#003399", textDecorationLine: "underline" },
  errorText: { color: "red", alignSelf: "flex-start", marginBottom: 10 },
});
