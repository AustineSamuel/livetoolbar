import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import Header from '@/utils/Header';
import globStyle, { screenPadding } from '@/glob/style';
import { docQr } from '@/Logics/docQr';
import useUser from '@/hooks/useUser';
import { getErrorMessage } from '@/utils/getErrorMesage';
import colors from '@/constants/Colors';

export interface notification {
  id: string;
  userId:string
  message: string;
  title: string;
  image: string;
  sentAt: string;
}

const fakeNotifications: notification[] = [
  {
    id: '1',
    title: 'Job Approved',
    message: 'Your electrician job request has been approved!',
    image: 'https://via.placeholder.com/50',
    sentAt: '2025-07-29T09:00:00',
    userId:"user"
  },
  {
    id: '2',
    title: 'New Referral Bonus',
    message: 'You just earned ₦500 for referring a friend!',
    image: 'https://via.placeholder.com/50',
    sentAt: '2025-07-28T12:30:00',
    userId:"user"
  },
  {
    id: '3',
    title: 'Promotion',
    message: 'Get 10% off your next hire this weekend!',
    image: 'https://via.placeholder.com/50',
    sentAt: '2025-07-27T18:45:00',
    userId:"user"

  },
];

const Notification = () => {
  const [notifications,setNotifications] = useState<notification[]>([]); // set to [] to test empty state
const user=useUser();
const [error,setError]=useState<string>("");
const [loading,setLoading]=useState<boolean>(true);
console.log(notifications);
const fetchNotifications=async ()=>{
  try{
const _=await docQr("Notifications",{
  whereClauses:[
    {
      field:"userId",
      operator:"==",
      value:user?.userId||""
    }
  ]
});
setNotifications(_);
  }
  catch(err:any){
setError(getErrorMessage(err));
  }
  finally{
setLoading(false)
  }
}
useEffect(()=>{
if(user)fetchNotifications();
},[user]);
  const renderItem = ({ item }: { item: notification }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.message}>{item.message}</Text>
        <Text style={styles.date}>{new Date(item.sentAt).toLocaleString()}</Text>
      </View>
    </View>
  )

  return (
    <View style={{ flex: 1 }}>
      <Header title="Notifications" />
      <View style={{ padding: screenPadding, flex: 1 }}>

{error && <View style={[globStyle.flexItem,globStyle.alignCenter
]}>
  <Text style={{textAlign:'center',fontWeight:"bold",color:colors.danger}}>{error}</Text>
  </View>}

        {notifications.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>📭 No notifications yet</Text>
          </View>
        ) : (
          <FlatList
            data={notifications}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#f8f8f8',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    gap: 12,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
  message: {
    fontSize: 14,
    color: '#555',
    marginTop: 2,
  },
  date: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
});
