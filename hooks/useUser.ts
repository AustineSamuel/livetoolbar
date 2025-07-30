import { parse } from "@/Logics/date";
import { User } from "@/types/user.types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setUser } from "@/store/slices";
const useUser=()=>{
    const [user,setUser_]=useState<User>()
const props=useSelector((root:{app:any})=>root.app);
const dispatch=useDispatch();
useEffect(()=>{
if(props?.user)setUser_(props?.user);
},[props?.user]);
// useEffect(()=>{
// (async ()=>{
// if(!props?.user){
//     const user=parse((await AsyncStorage.getItem('user')||"null"));
//     setUser_(user);
//     dispatch(setUser(user));
// }
// })();
// },[])
return user;
}

export default useUser