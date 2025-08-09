import React, { useEffect, useMemo, useState } from 'react';
import * as Location from 'expo-location';
import { useDispatch, useSelector } from 'react-redux';
import { collection, doc, setDoc } from 'firebase/firestore';

import { Platform } from 'react-native';
import { requestTrackingPermissionsAsync } from 'expo-tracking-transparency';
import { appstate, setUserAddress } from '@/store/slices';
import { docQr } from '@/Logics/docQr';
import { AddData } from '@/Logics/addData';
import { db } from '@/firebase.config';
import { updateData } from '@/Logics/updateData';

export interface locationObj {
  accuracy: number;
  altitude: number;
  altitudeAccuracy: number;
  heading: number;
  latitude: number;
  longitude: number;
  speed: number;
}
export interface users_addresses {
  docId?: string,
  userId: string,
  userAddress: string;
  latitude: number;
  longitude: number;
  recentAddresses: users_addresses[];
  lastUpdate: string;
}

const UpdateAddressOnMovement = () => {
  const dispatch = useDispatch();
  const {user } = useSelector((state: { app: appstate }) => state.app);

  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
    address: string | null;
  }>({
    latitude: 0,
    longitude: 0,
    address: null,
  });

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [currentData, setCurrentData] = useState<any>();

  const initialize = async () => {

    try {

      const data = await docQr("users_addresses", { max: 1, whereClauses: [{ field: "userId", value: user?.userId||"", operator: "==" }] });
      if (data.length > 0) {
        console.log("we found existing records", data[0]);
        setCurrentData(() => data[0])
        // return console.error("start watching is disabled for now");
        return startWatching(data[0]);
      }
      else {
        console.log("add data fired once")
        await AddData(collection(db, "users_addresses"), {
          userId: user?.userId||"",
          userAddress: "",
          latitude: 0,
          longitude: 0,
          recentAddresses: [],
          lastUpdate: new Date().toISOString()
        } as users_addresses);
        console.log('initialize called after adding');

        return initialize();
      }
    }
    catch (error) {

    }


  }

  const updateFirebaseLocation = async (
    userId: string,
    address: {
      address: string;
      latitude: number;
      longitude: number;
    },
    currentData: users_addresses
  ) => {
    const data: users_addresses = {
      latitude: address.latitude,
      longitude: address.longitude,
      userAddress: address.address,
      recentAddresses: [],
      lastUpdate: new Date().toISOString(),
      userId
    }
    // if(currentData?.docId && process.env.NODE_ENV!=="production")return console.info("initialized of user movement tracking is disabled for now");

    try {
      if (currentData) {
        await updateData("users_addresses", currentData.docId || "", data)
        console.log("update address operations successful:")
      }
      else {
        console.error("update address failed as we did not find any address to update");
      }
    } catch (error) {
      console.error('Firestore update failed:', error);
    }
  };



  const getAddressFromLocation = useMemo(() => (async (latitude: number, longitude: number, currentData: users_addresses) => {
    if (!currentData) {

      console.warn("no current data to run address from locations ", { currentData });
      initialize();
    }
    try {
      // console.log('getting my location from', latitude, longitude);
      // const response = await fetch(
      //   `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.EXPO_PUBLIC_GOOGLE_API_KEY}`
      // );
      // const data = await response.json();
      // if (data.status === 'OK') {
      //   const address = data.results[0].formatted_address;

        const payload = { address:"", latitude, longitude };
        setLocation(payload);
        dispatch(setUserAddress (payload));

      //   if (user?.userId) {
      //     await updateFirebaseLocation(user.userId, payload, currentData);
      //   }
      // } else {
      //   setErrorMsg('Failed to get address from location');
      // }

    } catch (error) {
      console.error('Error fetching address to firestore:', error);
      setErrorMsg('Error fetching address');
    }
  }), [currentData, user, dispatch]);





  const handleLocationChange = (location: {
    coords: { latitude: number; longitude: number };
  }, currentData: users_addresses) => {
    console.log("fired location changed!");
    const { latitude, longitude } = location.coords;
    setLocation({ latitude, longitude, address: null });
    getAddressFromLocation(latitude, longitude, currentData);
  };

  const [startedListeningForPosition, setStartedListeningForPosition] = useState(false);


  const lastLocationRef = { current: null as null | { latitude: number; longitude: number } };

  const startWatching = async (currentData: users_addresses) => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.error('Location permission not granted');
      return;
    }

    const subscription = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        distanceInterval: 50,
        // timeInterval: 1000,
      },
      (location) => {
        const { latitude, longitude } = location.coords;
        const last = lastLocationRef.current;

        if (!last || last.latitude !== latitude || last.longitude !== longitude) {
          lastLocationRef.current = { latitude, longitude };
          console.log("use moved to a new location...");
          handleLocationChange(location, currentData);
        }
      }
    );
    return subscription;
  };


  const [permissionGranted,setPermissionGranted]=useState<boolean>(false);

  useEffect(() => {
    if (user?.userId && !startedListeningForPosition && permissionGranted) {
      setStartedListeningForPosition(true);
      (async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
        const loc = await Location.getCurrentPositionAsync({});
        handleLocationChange(loc, currentData);
        const subscription = await initialize();
        return () => {
          if (subscription?.remove) subscription.remove();
        };
      })();
    }

  }, [user, currentData,permissionGranted]);


  useEffect(() => {
    if(Platform.OS=="ios"){
    (async () => {
      const { status } = await requestTrackingPermissionsAsync();
      if (status === 'granted') {
        setPermissionGranted(true)
      }
    })();
  }
  else{
        setPermissionGranted(true)
  }
  }, []);


  return <></>; // This is a background service-like component
};

export default UpdateAddressOnMovement;
