import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { service } from '@/app_modules/static-data/services';
import colors from '@/constants/Colors';
import globStyle from '@/glob/style';
import { router, useFocusEffect } from 'expo-router';
import { docQr } from '@/Logics/docQr';
import { Ionicons } from '@expo/vector-icons';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/firebase.config';
import MyButton from '@/utils/button';
import BR from '@/utils/BR';

export interface props {
  isAdmin?: boolean;
  max?: number;
}

const Services: React.FC<props> = ({ isAdmin, max }) => {
  const [data, setData] = useState<service[]>([]);
  const [selectedService, setSelectedService] = useState<service | null>(null);
  const [showModal, setShowModal] = useState(false);

  const [loading,setLoading]=useState<boolean>(false);
  const fetchData = async () => {
    setLoading(true);
    try {
      const data_res = await docQr('Services', { max });
      setData(data_res);
    } catch (err: any) {
      console.warn('Failed to fetch services:', err?.message || err);
    }
    finally{
      setLoading(false);
    }
  };

  useFocusEffect(useCallback(() => {
    fetchData();
  }, []));

  const openAdminModal = (item: service) => {
    setSelectedService(item);
    setShowModal(true);
  };

  const handleEdit = () => {
    setShowModal(false);
    router.push({
      pathname: '/screens/EditService',
      params: { item: JSON.stringify(selectedService) },
    });
  };

  const [deleting,setDeleting]=useState<boolean>(false);
  const handleDelete = async () => {
    if (!selectedService?.docId) return;
    setShowModal(false);

    Alert.alert(
      'Delete Service',
      `Are you sure you want to delete "${selectedService.name}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              setDeleting(true);
              // await deleteDoc(doc(db, 'Services', selectedService.docId));
              Alert.alert('Deleted', 'Service has been deleted');
              fetchData();
            } catch (error: any) {
              Alert.alert('Delete Error', error.message);
            }
            finally{
              setDeleting(false)
            }
          },
        },
      ]
    )
  }

  const renderCard = ({ item }: { item: service }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        if (isAdmin) openAdminModal(item);
        else
          router.push({
            pathname: '/screens/ServiceProviders',
            params: { item: JSON.stringify(item) },
          });
      }}
    >
      <View style={[globStyle.flexItem, globStyle.justifyCenter]}>
        <Image source={{ uri: item.image }} style={styles.image} />
      </View>
      <Text style={styles.name}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ padding: 2, backgroundColor: colors.white, borderRadius: 15 }}>
      <View style={{ padding: 10 }}>
        <Text style={{ fontWeight: 'bold', color: colors.black, fontSize: 20 }}>
          Our services
        </Text>
        <Text style={{ fontStyle: 'italic', color: colors.black, fontSize: 12 }}>
          What services do you want us to provide for you today?
        </Text>
      </View>

{loading && <View style={{padding:20}}>
  <ActivityIndicator size={30}/>
  </View>}
      <FlatList
        data={data}
        keyExtractor={(item) => item.serviceId}
        numColumns={4}
        renderItem={renderCard}
      />
      {isAdmin && <>
<BR height={20}/>

 <View style={[globStyle.alignCenter,globStyle.flexCenter]}>
<MyButton onPress={()=>{
  router.push("/screens/CreateService")
}} style={{borderRadius:30}}>
  <Text style={{color:colors?.white}}>
Add new service
</Text>
</MyButton>

 </View>
<BR height={20}/>
</>}
      <Modal
        visible={showModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Manage Service</Text>
            <Text style={{ marginVertical: 10 }}>{selectedService?.name}</Text>

            <TouchableOpacity style={styles.editBtn} onPress={handleEdit}>
              <Ionicons name="create-outline" size={20} color="white" />
              <Text style={styles.btnText}>Edit</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete}>
              <Ionicons name="trash-outline" size={20} color="white" />
              <Text style={styles.btnText}>Delete</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setShowModal(false)}
              style={{ marginTop: 20, alignSelf: 'center' }}
            >
              <Text style={{ color: '#007bff' }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    paddingTop: 8,
    shadowColor: '#94949b',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
  },
  name: {
    padding: 8,
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  editBtn: {
    backgroundColor: '#007bff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:"center",
    padding: 12,
    borderRadius: 8,
    marginTop: 15,
    gap: 8,
    textAlign:'center'
  },
  deleteBtn: {
    backgroundColor: '#dc3545',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:"center",
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    gap: 8,
    textAlign:'center'
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign:"center"
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    flexDirection:"row",
    // padding: 30,
    alignItems:'flex-end'
  },
  modalContent: {
    backgroundColor: 'white',
    width:"100%",

    borderRadius: 10,
    padding: 25,
  },
});

export default Services;
