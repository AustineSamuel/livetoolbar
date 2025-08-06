import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useFocusEffect } from 'expo-router';
import moment from 'moment';

import Header from '@/utils/Header';
import globStyle, { screenPadding } from '@/glob/style';
import colors from '@/constants/Colors';
import { docQr } from '@/Logics/docQr';
import MyButton from '@/utils/button';
import { HireWorkers } from '@/app_modules/screens/HireAWorkerScreen';
import { truncateString } from '../../Logics/date';

const HireWorkersListScreen = () => {
  const [search, setSearch] = useState('');
  const [data, setData] = useState<HireWorkers[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchHireRequests = async () => {
    try {
      const response = await docQr("WorkersNeeded");
      console.log('Fetched jobs:', response);
      setData(response);
    } catch (err) {
      console.error('Error fetching jobs:', err);
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchHireRequests();
    }, [])
  );

  const filteredJobs = data.filter(
    (job) =>
      job.name.toLowerCase().includes(search.toLowerCase()) ||
      job.description.toLowerCase().includes(search.toLowerCase()) ||
      job.workers_location.toLowerCase().includes(search.toLowerCase())
  );

  const messagePerson=async (item:HireWorkers)=>{
try{
  console.log(item);

}
catch(err:any){

}
finally{

}

  }
  if (loading) {
    return (
      <View style={[{ flex: 1 }, globStyle.flexItem, globStyle.alignCenter, globStyle.justifyCenter]}>
        <ActivityIndicator size={30} />
      </View>
    );
  }

  return (
    <>
      <Header title="Hire Workers Requests" />
      <View style={styles.container}>
        <TextInput
          placeholder="Search jobs..."
          style={styles.input}
          value={search}
          onChangeText={setSearch}
        />

        {filteredJobs.length === 0 ? (
          <Text style={styles.noResultText}>No hire requests found.</Text>
        ) : (
          <FlatList
            data={filteredJobs}
            keyExtractor={(item) => item.uid}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <View style={styles.topRow}>
                  <Image
                    source={{ uri: item.user?.photo }}
                    style={styles.avatar}
                  />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.description}>{truncateString(item.description,60)}</Text>
                    <Text style={styles.metaText}>
                      Location: {item.workers_location}
                    </Text>
                    <Text style={styles.metaText}>
                      Age: {item.ageStartFrom} - {item.ageFinishedMaximun}
                    </Text>
                    <Text style={styles.metaText}>
                      Created: {moment(item.createdAt).format('YYYY-MM-DD')}
                    </Text>
                    <Text style={styles.statusText}>
                      Status:{' '}
                      {item.alreadyHired
                        ? `✅ Hired ${item.workerSelected?.fullname || ''}`
                        : '❌ Not yet hired'}
                    </Text>
                  </View>

                  <View>
                    <MyButton onPress={()=>{
                      messagePerson(item)
                    }} style={{borderRadius:20,backgroundColor:colors.primaryColor}}><Text style={{color:"white"}}>Message</Text></MyButton>
                  </View>
                </View>

                {item.alreadyHired && item.workSelectedAt && (
                  <Text style={styles.hiredAt}>
                    Hired on: {moment(item.workSelectedAt).format('YYYY-MM-DD')}
                  </Text>
                )}
              </View>
            )}
          />
        )}
      </View>
    </>
  );
};

export default HireWorkersListScreen;

const styles = StyleSheet.create({
  container: {
    padding: screenPadding,
    flex: 1,
    backgroundColor: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 10,
  },
  noResultText: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 16,
    color: '#888',
  },
  card: {
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    borderColor: '#e0e0e0',
    borderWidth: 1,
  },
  topRow: {
    flexDirection: 'row',
    gap: 10,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#333',
  },
  metaText: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  statusText: {
    marginTop: 6,
    fontWeight: 'bold',
    fontSize: 14,
    color: colors.primaryColor,
  },
  hiredAt: {
    marginTop: 6,
    fontSize: 13,
    color: '#555',
    fontStyle: 'italic',
  },
});
