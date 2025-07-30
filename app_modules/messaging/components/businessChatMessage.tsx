import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Pressable } from 'react-native';
import { message, onGoingBusiness } from '../types/message.interface';

import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import { docQr } from '@/Logics/docQr';
import useUser from '@/hooks/useUser';
import { ImageGrid, ImageGridSkeleton } from '@/utils/Images';
import globStyle, { width } from '@/glob/style';
import Skeleton from '@/utils/skelton';
import BR from '@/utils/BR';
import colors from '@/constants/Colors';

const BusinessChatMessage: React.FC<{ message: message }> = ({ message }) => {
  const [businessData, setBusinessData] = useState<onGoingBusiness | null>(null);
  const [property, setProperty] = useState<any | null>(null);
  const [error, setError] = useState<{ title: string; message: string }>();
  const [fetchingBusiness, setFetchingBusiness] = useState<boolean>(false);
  const [fetchingProperty, setFetchingProperty] = useState<boolean>(false);

  const fetchOnGoingBusiness = async () => {
    setFetchingBusiness(true);
    try {
      const data = await docQr('ongoingBusinesses', {
        whereClauses: [{ field: 'messageBusinessId', operator: '==', value: message?.messageBusinessId }],
      });
      if (data.length > 0) setBusinessData(data[0]);
      else throw new Error();
    } catch {
      setError({
        title: 'Business Not Found',
        message: 'Try searching from your business list.',
      });
    } finally {
      setFetchingBusiness(false);
    }
  };

  const fetchPropertyData = async (propertyId: string) => {
    setFetchingProperty(true);
    try {
      const data = await docQr('listed_places', {
        whereClauses: [{ field: 'placeId', operator: '==', value: propertyId }],
      });
      if (data.length > 0) setProperty(data[0]);
      else throw new Error();
    } catch {
      setError({
        title: 'Property Not Found',
        message: 'Try searching from your property list.',
      });
    } finally {
      setFetchingProperty(false);
    }
  };

  useEffect(() => {
    fetchOnGoingBusiness();
  }, []);

  useEffect(() => {
    if (!property && businessData?.propertyId) fetchPropertyData(businessData.propertyId);
  }, [businessData]);
  const user=useUser();
    const isMyMessage = message.senderId === user?.userId;

  const navigate=useNavigation()
  if (fetchingBusiness || fetchingProperty) {
    return (
      <View style={[styles.container, globStyle.alignCenter,globStyle.flexItem,globStyle.flexGap5]}>
        <ImageGridSkeleton urls={['1', '2']} width={width*0.3} height={60} />
        <View style={{gap:10}}>
<Skeleton width={width*0.5} height={60} />
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, globStyle.alignCenter]}>
        <Text style={styles.errorTitle}>{error.title}</Text>
        <Text style={styles.errorText}>{error.message}</Text>
        <BR/>
        <Button onPress={()=>{
          navigate.navigate('OnGoingBusinesses'as never)
        }}  style={{
          borderColor:colors?.primaryColor,
          borderWidth:1,
          paddingVertical:1,
          borderRadius:30
        }}> to your business list</Button>
      </View>
    );
  }

  return (
    <View style={[styles.container, globStyle.flexItem,globStyle.flexGap5]}>

<View style={{width:"30%"}}>

{fetchingProperty ? <ImageGridSkeleton urls={['1', '2']} width={width*0.2} height={width*0.2} /> : <ImageGrid urls={property?.gallery?.map((g:any) => g.url).filter((url:any) => !url.includes("mp4")) || [] } width={width*0.25} height={width*0.25} max={2}/>}
            {isMyMessage && <Text style={{ marginTop:10,fontSize: 10, fontStyle: "italic", color: isMyMessage ? "#167144" : "#192921" }}>{message.status} {message.status.trim().toLocaleLowerCase() == "read" && <FontAwesome5 size={8} color={"#a6edc9"} name={"check-double"} />}</Text>}

</View>
<View style={{width:"70%"}}>
      {property && (
        <View style={styles.details}>
          <Text style={styles.label}>Property:</Text>
          <Text style={styles.value}>{property?.title || 'Unnamed'}</Text>
        </View>
      )}

      {businessData && (
        <>
          <View style={styles.details}>
            <Text style={styles.label}>Status:</Text>
            <Text style={styles.value}>{businessData.status || 'N/A'}</Text>
          </View>

          <Pressable style={styles.respondBtn} onPress={() =>{
          navigate.navigate('OnGoingBusinesses'as never)
          }}>
            <Text style={styles.respondText}>Check out</Text>
          </Pressable>
        </>
      )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 6,
    backgroundColor: colors.white,
    marginVertical: 6,
    borderWidth: 1,
    borderColor:colors?.lightGray,
    width: '100%',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 14,
    color: colors.grey,
  },
  errorTitle: {
    color: 'red',
    fontWeight: 'bold',
  },
  errorText: {
    color: colors.grey,
  },
  messageText: {
    fontSize: 16,
    marginBottom: 10,
  },
  details: {
    marginTop: 6,
  },
  label: {
    fontWeight: 'bold',
    color: colors.black
  },
  value: {
    color: colors.primaryColorDarker,
  },
  respondBtn: {
    marginTop: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: colors.grey,
    borderRadius: 6,
    alignItems: 'center',
  },
  respondText: {
    color: colors.white,
    fontWeight: 'bold',
  },
});

export default BusinessChatMessage;
