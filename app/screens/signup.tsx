import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import colors from "@/constants/Colors"; // Make sure colors.primaryColor exists
import { AddData } from "@/Logics/addData";
import { collection } from "firebase/firestore";
import { db } from "@/firebase.config";
import { showNotification } from "@/store/notificationSlice";
import { getErrorMessage } from "@/utils/getErrorMesage";
import { useDispatch } from "react-redux";
import { docQr } from "@/Logics/docQr";
import Header from "@/utils/Header";
import { setUser } from "@/store/slices";
import { generateRandomString } from "@/utils/random";

export default function SignupScreen() {
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm,setPasswordConfirm]=useState<string>('');

  const [type, setType] = useState<"Vendor" | "User">("User");
  const [home,setHome]=useState<string>("")
  const [errors, setErrors] = useState<any>({});
  const [NIN,setNIN]=useState<string>("");

  const [submitting,setSubmitting]=useState<boolean>(false);
  const dispatch=useDispatch()
  const handleSignup = async () => {
    const newErrors: any = {};

    if (!username.trim()) newErrors.username = "Username is required";
    if (!fullname.trim()) newErrors.fullname = "Full name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    if (!home.trim()) newErrors.homeAddress = "Home address is required";
    if (!NIN.trim() && NIN.length<9) newErrors.nin = "Valid NIN is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";
    if (!password) newErrors.password = "Password is required";
    if (password!==passwordConfirm) newErrors.passwordConfirm = "Password is required";
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log({ username, fullname, email, password, type });
      try{
      setSubmitting(true)
      const data_to_submit={
         username, 
         fullname, 
         email, 
         password,
         address:home,
         nin:NIN,
         userId:generateRandomString(10),
             balance:1500,
    balance_before:0,
    balance_updatedAt:null
      }
      const checks=await docQr("Users",{
        whereClauses:[
          {
            field:"email",
            operator:"==",
            value:email
          }
        ]
      })
      if(checks.length > 0){
        return dispatch(showNotification({
          message:"Email already exist please login instead"
        }))

      }
      
const checks1=await docQr("Users",{
        whereClauses:[
          {
            field:"username",
            operator:"==",
            value:username
          }
        ]
      })
      if(checks1.length > 0){
        return dispatch(showNotification({
          message:"Username is taken please try deferent username"
        }))
      }
      
     const id= await AddData(collection(db,"Users"),data_to_submit);
dispatch(showNotification({
  message:"Registration succesful",
  type:"success"
}));
 dispatch(setUser({...data_to_submit,docId:id}))
  dispatch(showNotification({
    message:"Login successful",
    type:"success"
  }))
 return router.push("/(tabs)")
    }
    catch(err:any){
     dispatch(showNotification({message:getErrorMessage(err),type:"error"}));

    }
    finally{
      setSubmitting(false);
    }
    }
  };

  return (<>
  <Header title="Signup"/>
    <View style={styles.container}>
    
      <Text style={styles.title}>Create your lifetoolbar account</Text>

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
        placeholder="Home Address"
        placeholderTextColor="#aaa"
        value={home}
        onChangeText={setHome}
      />
      {errors.homeAddress && <Text style={styles.errorText}>{errors.homeAddress}</Text>}


 <TextInput
        style={styles.input}
        placeholder="NIN"
        placeholderTextColor="#aaa"
        value={NIN}
        onChangeText={setNIN}
      />
      {errors.nin && <Text style={styles.errorText}>{errors.nin}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}


      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={passwordConfirm}
        onChangeText={setPasswordConfirm}
      />
      {errors.passwordConfirm && <Text style={styles.errorText}>{errors.passwordConfirm}</Text>}

   

      <TouchableOpacity disabled={submitting} style={[styles.button,{
        opacity:submitting ? 0.6:1
      }]} onPress={handleSignup}>
        <Text style={styles.buttonText}>{submitting  ? "Please wait...":"Sign Up"}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/screens/login")}>
        <Text style={styles.link}>Already have an account? Sign in</Text>
      </TouchableOpacity>
    </View>
    </>
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
    marginTop:5,
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
  errorText: { color: "red", alignSelf: "flex-start", marginBottom: 10,fontSize:10,fontStyle:"italic" },
});
