import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  Image,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useFocusEffect } from 'expo-router';
import moment from 'moment';

import Header from '@/utils/Header';
import globStyle, { screenPadding } from '@/glob/style';
import colors from '@/constants/Colors';
import MyButton from '@/utils/button';
import { docQr } from '@/Logics/docQr';
import { ProvidersService } from './ApplyAsServiceProvider';
import { updateData } from '@/Logics/updateData';
import { getCurrentTimestamp } from '@/Logics/DateFunc';
import { deleteData } from '@/Logics/deleteData';
import { useDispatch } from 'react-redux';
import { showNotification } from '@/store/notificationSlice';

const ManageProviderStatusScreen = () => {
  const [search, setSearch] = useState('');
  const [data, setData] = useState<ProvidersService[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProviders = async () => {
    try {
      const providers = await docQr('service_providers');
      setData(providers);
    } catch (err) {
      console.error('Error fetching providers:', err);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchProviders();
    }, [])
  );

  const dispatch=useDispatch();
  const handleRemoveStatus = (uid: string) => {
    Alert.alert(
      'Remove provider from this platform',
      'Are you sure you want to remove this provider’s entirely from this platform?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
      onPress:async  () => {
        const providerData=data.filter((provider) =>{
                
                return provider.uid==uid
            })?.[0];
        deleteData("service_providers",providerData?.docId||"").then(()=>{
            dispatch(showNotification({
                message:"Provider remove successfully",
                type:"success"
            }));

        })
            setData((prev) =>
              prev.filter((provider) =>{
                
                return provider.uid!==uid
            }
              )
            );
          },
        
        },
      ]
    );
  }
 const ApproveProvider = (uid: string) => {
    Alert.alert(
      'Approve Provider',
      'Are you sure you want to approve this provider into this platform?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Approve',
          style: 'destructive',
           onPress: () => {
            setData((prev) =>
              prev.map((provider) =>{
                if(provider.uid === uid){
                    const updatedData={
                      ...provider,
                      approved:true,
                      approvedAt: getCurrentTimestamp(),
                      declined: false,
                      declinedAt:"",
                      reasonForDeclined: '',
                    }
                    updateData("service_providers",provider.docId||"",updatedData).then(()=>{
                           dispatch(showNotification({
                message:"Provider remove successfully",
                type:"success"
            }));
                    })
                  return updatedData
                }
                return provider
            }
              )
            );
          },
        },
      ]
    );
  };


   const declineProvider = (uid: string) => {
    Alert.alert(
      'Decline provider',
      'Are you sure you want declined this provider from this platform?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Decline',
          style: 'destructive',
          onPress: () => {
            setData((prev) =>
              prev.map((provider) =>{
                if(provider.uid === uid){
                    const updatedData={
                      ...provider,
                      approved: false,
                      approvedAt: '',
                      declined: true,
                      declinedAt: getCurrentTimestamp(),
                      reasonForDeclined: '',
                    }
                    updateData("service_providers",provider.docId||"",updatedData).then(()=>{
                           dispatch(showNotification({
                message:"Provider remove successfully",
                type:"success"
            }));
                    })
                  return updatedData
                }
                return provider
            }
              )
            );
          },
        },
      ]
    );
  };





  const filteredProviders = data.filter(
    (provider) =>
      (
        provider.user?.fullname?.toLowerCase().includes(search.toLowerCase()) ||
        provider.user?.username?.toLowerCase().includes(search.toLowerCase()) ||
        search.trim() === ''
      )
  );

 
  if (loading) {
    return (
      <View
        style={[
          { flex: 1 },
          globStyle.flexItem,
          globStyle.alignCenter,
          globStyle.justifyCenter,
        ]}
      >
        <ActivityIndicator size={30} />
      </View>
    );
  }
// console.log(filteredProviders[0]);

  return (
    <>
      <Header title="Manage Providers" />
      <View style={styles.container}>
        <TextInput
          placeholder="Search providers..."
          style={styles.input}
          value={search}
          onChangeText={setSearch}
        />

        {filteredProviders.length === 0 ? (
          <Text style={styles.noResultText}>
            No approved or declined providers found.
          </Text>
        ) : (
          <FlatList
            data={filteredProviders}
            keyExtractor={(item,i:number) => i.toString()}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <View style={styles.infoRow}>
                  {item.user?.photo ? (
                    <Image
                      source={{ uri: item.user.photo }}
                      style={styles.avatar}
                    />
                  ) : (
                    <View style={[styles.avatar, { backgroundColor: '#ccc' }]} />
                  )}
                  <View>
                    <Text style={styles.name}>{item.user?.fullname}</Text>
                    <Text style={styles.username}>@{item.user?.username}</Text>
                                    <Text style={styles.username}>{item.service?.name}</Text>

                    <Text style={styles.statusText}>
                      {item.approved || item.declined ? 'Status: ' :null}
                      {item.approved
                        ? `✅ Approved on ${moment(item.approvedAt).format('YYYY-MM-DD')}`
                        : item.declined?`❌ Declined on ${moment(item.declinedAt).format('YYYY-MM-DD')}`: null}
                    </Text>
                    {item.reasonForDeclined ? (
                      <Text style={styles.reasonText}>
                        Reason: {item.reasonForDeclined}
                      </Text>
                    ) : null}
                  </View>
                </View>
               
        <View style={[
                    globStyle.flexItem,
                    globStyle.alignCenter,
                    {
                        gap:10,
                        justifyContent:'flex-end'
                    }
                ]}>

  <MyButton
                  label="Delete"
                  style={styles.removeBtn}
                  textStyle={{ color: colors.white }}
                  onPress={() => handleRemoveStatus(item.uid)}
                />
{!(item.approved || item.declined) &&<>
                <MyButton
                  label="approve"
                  style={styles.approveBtn}
                  textStyle={{ color: colors.white }}
                  onPress={() => ApproveProvider(item.uid)}
                />
                
                <MyButton
                  label="Decline"
                  style={styles.removeBtn}
                  textStyle={{ color: colors.white }}
                  onPress={() => declineProvider(item.uid)}
                />
                </>}
                </View>
         
              </View>
            )}
          />
        )}
      </View>
    </>
  );
};

export default ManageProviderStatusScreen;

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
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  username: {
    color: '#555',
  },
  statusText: {
    marginTop: 4,
    fontSize: 14,
  },
  reasonText: {
    fontSize: 13,
    fontStyle: 'italic',
    color: '#a33',
    marginTop: 2,
  },
  removeBtn: {
    backgroundColor: colors.danger || '#e53935',
    marginTop: 10,
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 15,
    alignSelf: 'flex-end',
  },
  approveBtn:{
    backgroundColor:"#119705",
       marginTop: 10,
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 15,
    alignSelf: 'flex-end',
  }
});
