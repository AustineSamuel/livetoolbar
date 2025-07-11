import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { servicesData } from '@/app_modules/static-data/services';
import colors from '@/constants/Colors';
import globStyle from '@/glob/style';

const Services: React.FC = () => {
  return (
    <View style={{ padding: 2,backgroundColor:colors?.white,borderRadius:15 }}>
        <View style={{padding:10}}>
            <Text style={{fontWeight:"bold",color:colors?.black,fontSize:20}}>Our services</Text>
        <Text style={{fontStyle:"italic",color:colors?.black,fontSize:12}}>What services do want us to provide for you today?</Text>
</View>
      <FlatList
        data={servicesData}
        keyExtractor={(item) => item.serviceId}
        numColumns={4}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <View style={[globStyle.flexItem,globStyle.justifyCenter]}>
            <Image source={{ uri: item.image }} style={styles.image} />
</View>
            <Text style={styles.name}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 8,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 5,
    paddingTop:8,
      shadowColor: '#94949b', // iOS shadow
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  },
  image: {
    width: 50,
    objectFit:"cover",

    height: 50,
  },
  name: {
    padding: 8,
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default Services;
