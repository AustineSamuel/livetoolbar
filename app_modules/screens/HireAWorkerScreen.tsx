import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Button,
  StyleSheet,
  Modal,
  Pressable,
} from "react-native";
import Header from "@/utils/Header";
import RenderError from "@/utils/renderError";
import { User } from "@/types/user.types";
import { height } from "@/glob/style";
import useUser from "@/hooks/useUser";
import { getCurrentTimestamp } from "@/Logics/DateFunc";
import { AddData } from "@/Logics/addData";
import { collection } from "firebase/firestore";
import { db } from "@/firebase.config";
import { useDispatch } from "react-redux";
import { showNotification } from "@/store/notificationSlice";
import { getErrorMessage } from "@/utils/getErrorMesage";

export interface HireWorkers {
  uid: string;
  user: User;
  name: string;
  description: string;
  ageStartFrom: number;
  ageFinishedMaximun: number;
  workers_location: string;
  createdAt:string,
  workerSelected?:User,
  workSelectedAt?:string,
  alreadyHired:boolean
}

const ageOptions = Array.from({ length: 53 }, (_, i) => i + 14); // 18 - 70

const HireAWorkerScreen = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    ageStartFrom: 0,
    ageFinishedMaximun: 0,
    workers_location: "",
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [ageType, setAgeType] = useState<"start" | "end">("start");

  const openModal = (type: "start" | "end") => {
    setAgeType(type);
    setModalVisible(true);
  };
  const user=useUser();

  const handleAgeSelect = (value: number) => {
    const key = ageType === "start" ? "ageStartFrom" : "ageFinishedMaximun";
    setForm({ ...form, [key]: value });
    setModalVisible(false);
  };

  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const [neededWorkers,setNeededWorkers]=useState<boolean>(false);
  const dispatch=useDispatch();
  const handleSubmit = async () => {
    const hireData: HireWorkers = {
      ...form,
      createdAt:getCurrentTimestamp(),
    uid: user?.userId||"",
      user:user as User,
      alreadyHired:false
    }
    setNeededWorkers(true)
  console.log(hireData);
  try{
  await AddData(collection(db,"WorkersNeeded"),{
    ...hireData
  });
dispatch(showNotification({
  message:"✅ Request sent to LifeToolBar successfully, we’ll get in touch with you shortly.",
  type:"success"
}));
setForm({
    name: "",
    description: "",
    ageStartFrom: 0,
    ageFinishedMaximun: 0,
    workers_location: "",
});

  }
  catch(err:any){
    dispatch(showNotification({message:getErrorMessage(err),type:"error"}));
  }
  finally{
    setNeededWorkers(false);
  }
  }

  return (
    <>
      <Header title="Hire a Worker" />
      <RenderError text="Quickly hire more workers using LifeToolbar." />

      <ScrollView contentContainerStyle={styles.container}>
    
        <TextInput
          style={styles.input}
          placeholder="Job Title / Name"
          value={form.name}
          onChangeText={(text) => handleChange("name", text)}
        />
        <TextInput
          style={[styles.input, styles.descriptionInput]}
          placeholder="Job Description"
          multiline
          textAlignVertical="top"
          value={form.description}
          onChangeText={(text) => handleChange("description", text)}
        />

        <TouchableOpacity onPress={() => openModal("start")} style={styles.ageSelector}>
          <Text>
            Age Start From: {form.ageStartFrom ? form.ageStartFrom : "Select Age"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => openModal("end")} style={styles.ageSelector}>
          <Text>
            Age Maximum: {form.ageFinishedMaximun ? form.ageFinishedMaximun : "Select Age"}
          </Text>
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Worker Location"
          value={form.workers_location}
          onChangeText={(text) => handleChange("workers_location", text)}
        />

        <View style={styles.buttonWrapper}>
          <Button disabled={neededWorkers} title={neededWorkers ? "Please wait...":"Submit"} onPress={handleSubmit} />
        </View>
      </ScrollView>

      {/* Modal for Age Selection */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Age</Text>
            <ScrollView style={{height:height/2}}>
              {ageOptions.map((age) => (
                <Pressable key={age} onPress={() => handleAgeSelect(age)} style={styles.ageOption}>
                  <Text>{age} years</Text>
                </Pressable>
              ))}
            </ScrollView>
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </>
  );
};

export default HireAWorkerScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    backgroundColor: "#fff",
  },
  descriptionInput: {
    height: 100,
  },
  ageSelector: {
    padding: 12,
    backgroundColor: "#ffffff",
    borderRadius: 10,

    borderWidth: 1,
    borderColor: "#ccc",
  },
  buttonWrapper: {
    marginTop: 20,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    maxHeight: "50%",
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  ageOption: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
});
