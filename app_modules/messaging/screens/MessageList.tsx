
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Text, View } from 'react-native'
import MessagesItem, { MessagesItemSkeleton } from '../components/MessagesItem'
import { ScrollView } from 'react-native-gesture-handler'

import { useFocusEffect, useNavigation } from '@react-navigation/native'
import * as SecureStorage from 'expo-secure-store';
import { useMessageRelationships } from '../hooks/useMessageRelationships'
import { messages_relationShips } from '../types/message.interface';
import LottieView from 'lottie-react-native';
import { useDispatch, useSelector } from 'react-redux'
import useUser from '@/hooks/useUser'
import VerticalButtons, { ButtonItem } from '@/utils/verticalButtons'
import { appstate } from '@/store/slices'
import { parse } from '@/Logics/date'
import Header from '@/utils/Header'
import colors from '@/constants/Colors'
import BR from '@/utils/BR'


export interface messagingData{
    personId:string | number,
    action:string | 'message'|'call',
    type:'driving-chat' | 'property-chat'| string
}
const MessageList = () => {
const user=useUser();
//     const buttons:ButtonItem[]=useMemo(()=>{
// return [
//     {
//         name:"All messages",
//         active:true,
//         clickEvent:()=>{
//             console.log("fire....")
//         }
//     },
//     {
//         name:"Unread",
//         active:true,
//         clickEvent:()=>{
//             console.log("fire....")
//         }
//     },
//     {
//         name:"Blocked",
//         active:true,
//         clickEvent:()=>{
//             console.log("fire....")
//         }
//     }
// ]
//     },[]);


    const [messagingData,setMessagingData]=useState<messagingData>({
        action:"",
        personId:"",
        type:""
    });

    // const {showFixedCurrentBooking}=useSelector((root:{app:appstate})=>root.app);
    const dispatch=useDispatch();
    useFocusEffect(useCallback(()=>{
        const dataReceived=SecureStorage.getItem("messagingData")||"";
        if(parse(dataReceived))setMessagingData(parse(dataReceived));
     
    },[]))


const nav=useNavigation();
    useEffect(()=>{
if(messagingData){
    if(messagingData.personId && messagingData.action && messagingData.type){
        console.log(messagingData)
        nav.navigate("Chat" as never);
        // SecureStorage.setItem("messagingData","");
    }
}
    },[messagingData])
    const {loading:loadingMessages,relationships}=useMessageRelationships((user?.userId||"").toString());




  return (<>

<Header  title={"Messages"}/>
<View style={{paddingHorizontal:16,backgroundColor:colors.white}}>
    <BR height={10}/>
{/* <VerticalButtons items={buttons}/> */}
    </View>
    <ScrollView style={{backgroundColor:colors.white}}>
{loadingMessages ? [1,2,3,4,5,6,7,8].map((i)=><MessagesItemSkeleton key={i}/>):relationships.map((message:messages_relationShips,i:number)=>{
  return  <MessagesItem 
  currentUserId={user?.userId||""}
relationship={message}
key={i}
  />
})}

{!loadingMessages && relationships.length==0 && <View>
    <View style={
        {
            display:"flex",
            alignItems:"center",
            alignContent:"center",
        }
    }>


<LottieView  style={{
    width:200,
    height:200
    }}  source={require("../animations/Chat.json")} autoPlay loop={false} duration={8000}/>



    </View>
    <Text  style={{textAlign:"center",color:colors.grey,paddingHorizontal:60}}>
        All Messages from Lifetoolbar will appear here</Text>
    </View>}
    </ScrollView> 
    </>
  )
}

export default MessageList