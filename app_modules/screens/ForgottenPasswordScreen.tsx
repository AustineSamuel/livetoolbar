import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import colors from "@/constants/Colors";
import { useDispatch } from "react-redux";
import { showNotification } from "@/store/notificationSlice";
import { getErrorMessage } from "@/utils/getErrorMesage";
import { docQr } from "@/Logics/docQr";
import { setUser } from "@/store/slices";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "@/utils/Header";
import axios from "axios";
import { User } from "@/types/user.types";
import { generateUniqueString } from "@/Logics/date";
import { updateData } from "@/Logics/updateData";

export function isEmail(value: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
}

export default function ForgottenPasswordScreen() {
  const dispatch = useDispatch();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword,setConfirmPassword]=useState<string>("");

const [person,setPerson]=useState<User>();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
const [serverOtp,setServerOtp]=useState<string>();
  const handleEmailSubmit = async () => {
    if (!isEmail(email)) {
      return setError("Enter a valid email");
    }

    try {
      setLoading(true);
      setError("");
      const users = await docQr("Users", {
        whereClauses: [{ field: "email", operator: "==", value: email }],
      });

      if (!users || users.length === 0) {
        setError("No user found with this email");
        return;
      }
      const otp=generateUniqueString(6);
const person=users[0];
setPerson(person);
setServerOtp(otp);
const html = `
  <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f6f8; color: #333;">
    <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
      <h2 style="color: hsla(182, 64%, 52%, 1);">Reset Your Password</h2>

      <p style="font-size: 16px; line-height: 1.6;">
        Hi there,
      </p>

      <p style="font-size: 16px; line-height: 1.6;">
        You recently requested to reset your password for your <strong>LifeToolBar</strong> account.
        Use the OTP below to proceed:
      </p>

      <div style="text-align: center; margin: 30px 0;">
        <div style="display: inline-block; background-color: hsla(182, 64%, 52%, 1); color: white; font-size: 24px; font-weight: bold; padding: 14px 28px; border-radius: 8px; letter-spacing: 4px;">
          <strong>${otp}</strong>
        </div>
      </div>

      <p style="font-size: 16px; line-height: 1.6;">
        This OTP is valid for a short time. If you didn’t request this, you can safely ignore this email.
      </p>

      <p style="font-size: 16px; line-height: 1.6; margin-top: 40px;">
        Need help? Contact our support team anytime.
      </p>

      <p style="margin-top: 30px;">
        Warm regards,<br/>
        <strong>LifeToolBar Team</strong>
      </p>
    </div>

    <p style="text-align: center; font-size: 12px; color: #999; margin-top: 20px;">
      This is an automated message. Please do not reply.
    </p>
  </div>
`;

      const res=await axios.post(`https://bsbmarketplace-backend.onrender.com/send-mail`,{
    to: person.email,
  subject: "Your LifeToolBar OTP for Password Reset",
  html: html
      });
if(res?.status==200){
    //good
}
else{
    dispatch(showNotification({
        message:"OTP fail to sent please try again",
        type:"error"
    }))
}
      dispatch(
        showNotification({ message: "OTP sent to email!", type: "success" })
      );
      setStep(2);
    } catch (err: any) {
      dispatch(
        showNotification({ message: getErrorMessage(err), type: "error" })
      );
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const [verifying,setVerifying]=useState<boolean>(false);
  const handleOtpSubmit = () => {
    if (otp !== serverOtp) {
      setError("Incorrect OTP");
      return;
    }
    setVerifying(true);
    setTimeout(()=>{

    setError("");
    dispatch(showNotification({ message: "OTP Verified!", type: "success" }));
    setStep(3);
    setVerifying(false);
    },3000)

  };

  const handlePasswordReset = async () => {
    if (newPassword.length < 4) {
      return setError("Password too short");
    }
if(newPassword!==confirmPassword){
    return setError("Password not matched");
}
    try {
      setLoading(true);
      setError("");

      // Simulate password update
      const users = await docQr("Users", {
        whereClauses: [{ field: "email", operator: "==", value: email }],
      });

      if (!users || users.length === 0) {
        setError("User not found");
        return;
      }

      const user = { ...users[0], password: newPassword };
updateData("Users",person?.docId||"",user);
      // Simulate update in DB (in real life: use setDoc/updateDoc)
      await AsyncStorage.setItem("User", JSON.stringify(user));
      dispatch(setUser(user));
      dispatch(
        showNotification({ message: "Password updated!", type: "success" })
      );
      router.replace("/(tabs)");
    } catch (err: any) {
      setError(getErrorMessage(err));
      dispatch(showNotification({ message: getErrorMessage(err), type: "error" }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header title={`Forgotten Password`} />
      <View style={styles.container}>
        <Image
          style={{ width: 150, height: 150, borderRadius: 75 }}
          source={require("../../assets/images/icon.png")}
        />
        <Text style={styles.logo}>LifeToolBar</Text>

        {step === 1 && (
          <>
            <Text style={styles.title}>
              Enter your email address to receive an OTP
            </Text>
            <TextInput
              onChangeText={setEmail}
              style={styles.input}
              placeholder="Enter email address"
              placeholderTextColor="#aaa"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
            />
            {error && <Text style={styles.errorText}>{error}</Text>}
            <TouchableOpacity
              disabled={loading}
              onPress={handleEmailSubmit}
              style={[styles.button, { opacity: loading ? 0.6 : 1 }]}
            >
              <Text style={styles.buttonText}>
                {loading ? "Please wait..." : "Send OTP"}
              </Text>
            </TouchableOpacity>
          </>
        )}

        {step === 2 && (
          <>
            <Text style={styles.title}>Enter the OTP sent to your email</Text>
            <TextInput
              onChangeText={setOtp}
              style={styles.input}
              placeholder="Enter OTP"
              placeholderTextColor="#aaa"
              keyboardType="numeric"
              value={otp}
            />
            {error && <Text style={styles.errorText}>{error}</Text>}
            <TouchableOpacity
              disabled={loading}
              onPress={handleOtpSubmit}
              style={[styles.button, { opacity: loading ? 0.6 : 1 }]}
            >
              <Text style={styles.buttonText}>
                {loading || verifying ? "Please wait..." : "Verify OTP"}
              </Text>
            </TouchableOpacity>
          </>
        )}

        {step === 3 && (
          <>
            <Text style={styles.title}>Set your new password</Text>
            <TextInput
              onChangeText={setNewPassword}
              style={styles.input}
              placeholder="New Password"
              placeholderTextColor="#aaa"
              secureTextEntry
              value={newPassword}
            />
              <TextInput
              onChangeText={setConfirmPassword}
              style={styles.input}
              placeholder="Confirm Password"
              placeholderTextColor="#aaa"
              secureTextEntry
              value={confirmPassword}
            />
            {error && <Text style={styles.errorText}>{error}</Text>}
            <TouchableOpacity
              disabled={loading}
              onPress={handlePasswordReset}
              style={[styles.button, { opacity: loading ? 0.6 : 1 }]}
            >
              <Text style={styles.buttonText}>
                {loading ? "Updating..." : "Reset Password"}
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  logo: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#003399",
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    marginBottom: 20,
    paddingHorizontal:1,
    textAlign: "center",
  },
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
    backgroundColor: colors.primaryColor,
    paddingVertical: 15,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    alignSelf: "flex-start",
    marginBottom: 10,
    fontSize: 12,
    fontStyle: "italic",
  },
});
