 import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar, TouchableRipple } from 'react-native-paper';

import { router } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import * as SecureStorage from 'expo-secure-store';
import { message, messages_relationShips } from '../types/message.interface';
import moment from 'moment';
import { updateMessageStatus } from '../hooks/updateMessageStatus';
import colors from '@/constants/Colors';
import globStyle, { width } from '@/glob/style';
import Skeleton from '@/utils/skelton';
type Props = {
  relationship: messages_relationShips;
  currentUserId: string;
};

export const MessagesItem = ({ relationship, currentUserId }: Props) => {
  const nav = useNavigation();

  const openChatContent = () => {
 
    SecureStorage.setItem("conversationData", JSON.stringify(relationship));
    nav.navigate("Chat" as never);
  }

  const isSender = relationship.lastMessage?.senderId === currentUserId;
  const displayName =
    currentUserId === relationship.personId
      ? relationship.partnerName
      : relationship.personName;
  const displayPicture =
    currentUserId === relationship.personId
      ? relationship.partnerPicture
      : relationship.personPicture;
  const lastText = relationship.lastMessage?.text || "";


  const unreadMessages = relationship.messages.filter(
    (m) => m.status==='sent' && m.senderId !== currentUserId
  ).length
  
  return (
    <TouchableRipple
    hasTVPreferredFocus={undefined}
      onPress={()=>{
        openChatContent();
        if(unreadMessages>0){
          relationship.messages.filter(
            (m) => m.status==='sent'
          ).map((m:message)=>{
updateMessageStatus(relationship.messageCollection,m?.docId||"",'read')
          })
        }
      }}
      rippleColor={colors.lightGray}
      style={[styles.rippleWrapper, styles.container]}
    >
      <View style={[globStyle.flexItem, globStyle.alignCenter]}>
        <Avatar.Image

          source={{ uri: displayPicture || "https://via.placeholder.com/150" }}
          size={50}
        />
        <View style={{ gap: 4, padding: 10 }}>
          <View style={[globStyle.flexItem,globStyle.flexGap5,globStyle.alignCenter]}>
          <Text style={styles.title}>{displayName.split(" ")[0]}</Text> 
          <Text style={{fontWeight:"500",color:colors.lightGray,fontSize:12}}> - {moment(relationship.lastMessage.sentAt).format("hh:mm a - DD MMM")}</Text>
          </View>

          <Text style={styles.message}>
            {isSender ? "You: " : ""}
            <Text style={{ fontStyle: "italic" }}>{lastText}</Text>
          </Text>
        </View>




        {unreadMessages && <View style={[{flexGrow:1,borderColor:colors.grey,borderWidth:2, width:25,maxWidth:30,height:25,borderRadius:13,backgroundColor:colors?.primaryColor},globStyle.flexItem,globStyle.alignCenter,globStyle.justifyCenter]}>
 <Text style={{color:colors?.white,fontWeight:"bold"}}>{unreadMessages}</Text>
</View>}

      </View>
    </TouchableRipple>
  );
}

export const MessagesItemSkeleton = () => (
  <TouchableRipple
    rippleColor={colors.lightGray}
    borderless={false}
    style={[styles.rippleWrapper, styles.container]}
    hasTVPreferredFocus={undefined}
  >
    <View style={[globStyle.flexItem, globStyle.alignCenter]}>
      <Skeleton
       width={50}
       height={50}
       borderRadius={25}
      />
      <View style={{ gap: 10, padding: 10 }}>
        <Skeleton width={width*0.5} height={20} />
        <Skeleton height={10} width={width*0.2} />
      </View>
    </View>
  </TouchableRipple>
);



const styles = StyleSheet.create({
  rippleWrapper: {
    overflow: 'hidden',
    borderRadius: 10,
    marginVertical: 5,
  },
  container: {
    borderBottomColor: colors.grey,
    borderBottomWidth: 1,
    padding:5,
    borderRadius:5,
    paddingHorizontal: 20,
    backgroundColor: colors.white,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    padding:0,
    margin:0
  },
  message: {
    color: colors.lightGray,
    fontSize: 14,
    margin:0,
    padding: 0,
  },
});

export default MessagesItem;
