import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Header from "@/utils/Header";
import { fakeProviders } from "@/faker/workers";
import { ServiceProviders } from "../types/services.providers";
import MyButton from "@/utils/button";
import globStyle from "@/glob/style";
import colors from "@/constants/Colors";
import { useLocalSearchParams } from "expo-router";
import { service } from "../static-data/services";
import { getErrorMessage } from "@/utils/getErrorMesage";
import { docQr } from "@/Logics/docQr";


const ServiceProvidersScreen = () => {
  const [search, setSearch] = useState("");
const [data,setData]=useState<ServiceProviders[]>([]);

const [loading,setLoading]=useState<boolean>(true);
const [error,setError]=useState<string|null>(null);
const fetchProviders=async (item:service)=>{
try{
  setLoading(true);
  const resdata=await docQr("service_providers",{
    whereClauses:[
      {
        field:"serviceId",
        operator:"==",
        value:item.serviceId
      }
    ]
  })
  setData(resdata);
setLoading(false);
}
catch(err:any){
setError(getErrorMessage(err.message));
}
finally{
setLoading(false);
}
}


  const filteredData = data.filter((provider) =>
    provider.user.fullname.toLowerCase().includes(search.toLowerCase()) ||
    provider.user.username.toLowerCase().includes(search.toLowerCase()) ||
    provider.profile.toLowerCase().includes(search.toLowerCase())
  )
  const { item } = useLocalSearchParams();

  const parsedItem:service = useMemo(() => item ? JSON.parse(item as string) : null, [item]);
  useEffect(()=>{
if(parsedItem){
  fetchProviders(parsedItem);
}
  },[parsedItem]);
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
{loading ? <View style={{padding:20}}><ActivityIndicator size="large" color={colors.primaryColor} /></View> : null}
      {!loading && filteredData.length === 0 && (
        <View style={{ padding: 20 }}>
          <Text style={{textAlign:'center'}}>No results found</Text>
        </View>
      )}

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
