import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Header from "@/utils/Header";
import { fakeProviders } from "@/faker/workers";
import { ServiceProviders } from "../types/services.providers";
import MyButton from "@/utils/button";
import globStyle from "@/glob/style";
import colors from "@/constants/Colors";
import { useLocalSearchParams } from "expo-router";
import { service } from "../static-data/services";


const ServiceProvidersScreen = () => {
  const [search, setSearch] = useState("");
const [data,setData]=useState<ServiceProviders[]>([...fakeProviders,...fakeProviders,...fakeProviders,...fakeProviders]);

  const filteredData = data.filter((provider) =>
    provider.user.fullname.toLowerCase().includes(search.toLowerCase()) ||
    provider.user.username.toLowerCase().includes(search.toLowerCase()) ||
    provider.profile.toLowerCase().includes(search.toLowerCase())
  )
  const { item } = useLocalSearchParams();

  const parsedItem:service = item ? JSON.parse(item as string) : null;
  return (
    <>
    <Header title={parsedItem.name+" services"}/>

      <View style={styles.container}>
        <TextInput
          placeholder={`Search ${parsedItem.name}s...`}
          style={styles.input}
          value={search}
          onChangeText={setSearch}
        />

        <FlatList
          data={filteredData}
          keyExtractor={(item,index:number) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card}>
                <View style={[globStyle.flexItem,globStyle.alignCenter,globStyle.flexGap10]}>
              <Image source={{ uri: item.user.photo }} style={styles.avatar} />
              <View>
                <Text style={styles.name}>{item.user.fullname}</Text>
                <Text style={styles.username}>@{item.user.username}</Text>
                <Text style={styles.meters}>120 kilomiters away</Text>
              </View>
              </View>
              <View>
                <MyButton style={{backgroundColor:colors.secondaryColor,borderRadius:30}} textStyle={{color:colors.black}} label="Hire"></MyButton>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </>
  );
};

export default ServiceProvidersScreen
const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
    backgroundColor: "#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 10,
  },
  card: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    padding: 10,
    justifyContent:'space-between',
    borderRadius: 10,
    backgroundColor: "#f6f6f6",
    marginBottom: 10,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
  },
  username: {
    color: "#555",
  },
  meters: {
    fontStyle: "italic",
    color: "#888",
  },
});
