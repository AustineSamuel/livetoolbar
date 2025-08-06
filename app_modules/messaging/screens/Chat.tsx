import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, FlatList, Image, TextInput, TouchableOpacity, Keyboard, Linking, Alert, ActivityIndicator, KeyboardAvoidingView, Modal, TouchableWithoutFeedback } from 'react-native';
import { AntDesign, FontAwesome, FontAwesome5, Ionicons } from '@expo/vector-icons';

import { message, messages_relationShips, onGoingBusiness } from '../types/message.interface';

import { useFocusEffect, useNavigation } from '@react-navigation/native';
import * as SecureStorage from 'expo-secure-store';
import { messagingData } from './MessageList';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage } from '../hooks/sendMessage';

import { collection, onSnapshot, orderBy, query, count } from 'firebase/firestore';
import LottieView from 'lottie-react-native';
import { suggestionsJson } from '../data/suggestions';

import moment from 'moment';
import { updateMessageStatus } from '../hooks/updateMessageStatus';
import { propertyChatSuggestions } from '../data/propertyChatSugestion';
import getLastMessage from '../logics/getLastMessageBySentAt';
import BusinessChatMessage from '../components/businessChatMessage';
import { User } from '@/types/user.types';
import { AddData } from '@/Logics/addData';
import { db } from '@/firebase.config';
import { showNotification } from '@/store/notificationSlice';
import { api } from '@/api/base';
import { docQr } from '@/Logics/docQr';
import { getErrorMessage } from '@/utils/getErrorMesage';
import useUser from '@/hooks/useUser';
import { appstate } from '@/store/slices';
import globStyle from '@/glob/style';
import Skeleton from '@/utils/skelton';
import NotificationIcon from '@/utils/NotificationIcon';
import colors from '@/constants/Colors';
import { generateUniqueString, getTimeAgoString, parse } from '@/Logics/date';

/**
 * 
 * @returns POST messagingData{
    personId:string | number,
    action:string | 'message'|'call',
    type:'driving-chat'| string

} TO SECURE STORAGE WILL USE IT TO INITIATE CHAT
 */

const ChatScreen = () => {
  const [inputText, setInputText] = useState('');
  const [recording, setRecording] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const isSend = true//before was using this to check if its recording or sending messae text
  const auth_token = useSelector((root: { others: any }) => root.others.auth_token);
  const [conversationData, setConversationData] = useState<messages_relationShips | null>(null);
  //  const parsedDetails = JSON.parse(params);
  const [partnerProfile, setPartnerProfile] = useState<User | null>(null);
  const [partnerUser, setPartnerUser] = useState<User | null>(null);
  const [loadingPartnerDetails, setLoadingPartnerDetails] = useState<boolean>(false);
  const [messages, setMessages] = useState<message[]>([]);

  const [suggestions, setSuggestions] = useState<string[]>(suggestionsJson.slice(0, 20));
  let [unsubscribeFn, setUnsubscribeFn] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const messagesRef = useRef<FlatList | any>(null);
  const [ongoingBusinesses, setOngoingBusinesses] = useState<onGoingBusiness[]>();
  const showError=(message:string)=>{
    dispatch(showNotification({
      message:message,
      type:"error"
    }))
  }
  const showSuccess=(message:string)=>{
    dispatch(showNotification({
      message,
      type:"success"
    }))
  }


  const getOngoingBusiness = async (messagingCollectionId: string) => {
    // const data = await docQr("ongoingBusinesses", { whereClauses: [{ field: "chatId", operator: "==", value: messagingCollectionId }] })
    // setOngoingBusinesses(data as onGoingBusiness[])
  }
  const [weHaveANewBusiness, setWeHaveANewBusiness] = useState<boolean>(false);
  const [newBusiness, setNewBusiness] = useState<onGoingBusiness | null>(null);
  const hasInitialized = useRef(false)
  const initializeBusiness = async () => {
    const businessDataString = SecureStorage.getItem("businessData");
    const businessData: onGoingBusiness = JSON.parse(businessDataString || "");
    if (!businessData) return
    //send the messing if we get to know the chatId then save the business data to db 
    if (businessData) {
      const chatId: string = conversationData?.messageCollection || (user?.userId || "") + "Chats" + partnerUser?.userId || "";
      businessData.chatId = chatId
      //sand message
      // const lastMessage = await getLastMessage(chatId)
      // if (lastMessage?.type !== "business") {
      //   handleSendPress({//send the message with these props
      //     businessType: businessData.type,
      //     type: "business",
      //     text:"business initiated"
      //   })
      //   setWeHaveANewBusiness(true)
      //   setNewBusiness(businessData)
      // }
      // else {
      setNewBusiness(businessData)
      // setBusinessModalWarning(true)

      // }
      //we have a new business

    }
  }


  useEffect(() => {
    if (partnerProfile && !hasInitialized.current) {
      initializeBusiness();
      hasInitialized.current = true
    }
  }, [partnerProfile]);



  const [businessModalWarning, setBusinessModalWarning] = useState<boolean>(false);
  const [messagingCollectionId, setMessagingCollectionId] = useState<string | null>(null);
  const [creatingBusiness, setCreatingBusiness] = useState<boolean>(false);
  const handleConfirmNewConversation = async () => {
    setCreatingBusiness(true);
    if (!newBusiness) return;
    const messageBusinessId = generateUniqueString(10)
    try {
      handleSendPress({//send the message with these props
        businessType: newBusiness?.type,
        type: "business",
        text: "business initiated",
        messageBusinessId
      })
      setWeHaveANewBusiness(true)
      setNewBusiness(newBusiness)
      await AddData(collection(db, "ongoingBusinesses"), {
        ...newBusiness,
        chatId: messagingCollectionId,
        messageBusinessId

      } as onGoingBusiness);
      setWeHaveANewBusiness(false)
      setBusinessModalWarning(false)
      // showS("Great!", "Business initiated successfully");
      setNewBusiness(null)
      SecureStorage.deleteItemAsync("businessData");
    }
    catch (Err: any) {
      // showError("Error", getErrorMessage(Err))
    }
    finally {
      setCreatingBusiness(false)
    }
  }
  const listenForMessages = (messageCollection: string) => {
    const q = query(collection(db, messageCollection), orderBy("sentAt", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs: message[] = snapshot.docs.map((doc) => ({
        ...doc.data(),
        docId: doc.id,
      })) as message[];
      setMessages(msgs);


      if (msgs[msgs.length - 1]?.type !== "business") {//if the last message is not a business message
        if (weHaveANewBusiness) {
          AddData(collection(db, "ongoingBusinesses"), {
            ...newBusiness,
            chatId: messageCollection
          } as onGoingBusiness);
          setWeHaveANewBusiness(false)
          setNewBusiness(null)
          SecureStorage.deleteItemAsync("businessData");
        }
      }
      else {
        if (weHaveANewBusiness) setBusinessModalWarning(true)
      }

      if (msgs.length > messages.length) {
        const newMessages = msgs[msgs.length - 1];
        console.log(newMessages);
        if (newMessages.senderId !== user?.userId) {
          if (newMessages.status !== "read") updateMessageStatus(messageCollection, newMessages?.docId || "", "read");
        }
      }
    });
    return unsubscribe;
  };

  useEffect(() => {
    if (conversationData) {
      const collectionId = conversationData.messageCollection;
      // Cleanup any previous listener
      if (unsubscribeFn) {
        unsubscribeFn();
      }
      const unsub = listenForMessages(collectionId);
      setUnsubscribeFn(() => unsub);
      getOngoingBusiness(collectionId);
      setMessagingCollectionId(collectionId);
      getPartnerProfile(conversationData.initiatedBy === user?.userId ? conversationData.partnerId : conversationData.initiatedBy);
    }
    // Clean up on unmount
    return () => {
      if (unsubscribeFn) {
        unsubscribeFn();
      }
    };
  }, [conversationData]);

  const getPartnerProfile = async (partnerId: string) => {
    setLoadingPartnerDetails(true)
    //get partner profile if is vendor
    try {

      const getUsersafe = await api.get("/user/get-person/" + partnerId, { headers: { authorization: `Bearer ${auth_token}` } });
      if (!getUsersafe.data.person) {
        throw new Error("Person details  not found");
      }
      const person: User = getUsersafe.data.person
      setPartnerUser(person);
      const data = await docQr("vendors", {
        whereClauses: [
          {
            field: "email",
            operator: "==",
            value: person.email
          }
        ]
      })

      if (data.length > 0) {
        setPartnerProfile(data[0]);
        const profile = data[0];
        // setConversationData({
        // /*************  ✨ Windsurf Command ⭐  *************/
        //   conversationData:{
        //     initiatedBy:user?.userId,
        //     partnerId:partnerId,
        //     messageCollection:`${user?.userId}-${partnerId}`,
        //     messages:[],
        //     messagesCount:0,
        // /*******  7a8f213d-d22c-4c82-98f0-e90c8c5c3aba  *******/
        // })
      }
      else {
        console.warn("user is not a vendor")
      }
      //get user
      const user_data = await docQr("vendors", {
        whereClauses: [
          {
            field: "email",
            operator: "==",
            value: user?.email
          }
        ]
      })
      if (user_data.length > 0) setUserProfile(user_data[0])


    }
    catch (err) {
      //do not react
      console.error("fetch profile error:", getErrorMessage(err));
    }
    finally {
      setLoadingPartnerDetails(false);
    }
  }
  const handleInputChange = (text: string) => {
    if (messagingData.type === "driving-chat") setSuggestions(suggestionsJson.filter((suggestion) => suggestion.toLowerCase().includes(text.toLowerCase())).slice(0, 20));
    else if (messagingData.type === "property-chat") setSuggestions(propertyChatSuggestions.filter((suggestion) => suggestion.toLowerCase().includes(text.toLowerCase())).slice(0, 20));
    setInputText(text);
  };

  /**
   * Handles sending a message to the partner user.
   * @function handleSendPress
   * @param {boolean} isNewConversation - If true, create a new conversation
   * @returns {Promise<void>}
   */
  const handleSendPress = async (additionProps?: message | any) => {
    if (!user?.userId || !partnerUser?.userId) {
      return console.log("no user or partner user", user?.userId, partnerUser?.userId)
    }
    if (!inputText && additionProps.type !== "business") return
    if (!isSend) return;
    setSending(true);
    try {
      const chatId: string = conversationData?.messageCollection || (user?.userId || "") + "Chats" + partnerUser?.userId || "";
      const res = await sendMessage({
        messageCollection: chatId,
        senderId: user?.userId || "",
        receiverId: partnerUser?.userId || "",
        senderPicture: "",
        text: inputText,
        files: [],
        partnerId: partnerUser?.userId || "",
        personId: user?.userId || "",
        personName: userProfile?.fullname||"",
        partnerName: partnerProfile?.fullname||"",
        partnerPicture: partnerProfile?.photo||"",
        personPicture: user?.photo,
        isNewConversation: isNewConversation || false,
      }, (additionProps ? additionProps : {}));


      if (isNewConversation && res.relationship) {
        // Set conversation data from returned relationship
        setConversationData(res.relationship);
        setIsNewConversation(false);
        getOngoingBusiness(res.relationship.messageCollection);
      } else {
        // Optionally update the conversation data or last message if needed
        // Example:
        setConversationData((prev: messages_relationShips | null) => {
          if (!prev) return prev
          return ({
            ...prev,
            lastMessage: {
              ...prev.lastMessage,
              text: inputText,
              sentAt: new Date().toISOString(),
            },
          })
        })
      }

      setInputText('');
      Keyboard.dismiss();
    } catch (error) {
      console.error('Error sending message:', error);
      // Optionally show toast or error dialog
    }
    finally {
      setSending(false)
    }
  };

  const [sending, setSending] = useState(false);


  const handlePhoneCall = () => {
    console.log("go to call screen")
    // const phoneNumber = number; // Replace with the actual phone number
    //Linking.openURL(phoneNumber).catch(err => console.error('Error making phone call:', err));
  };


  const nav = useNavigation();
  const  user  = useUser();
  const [messagingData, setMessagingData] = useState<messagingData>({
    action: "",
    personId: "",
    type: ""
  })
  useFocusEffect(useCallback(() => {
    const dataReceived = SecureStorage.getItem("messagingData") || "";
    if (parse(dataReceived)) setMessagingData(parse(dataReceived));
    const conversionDataReceived = SecureStorage.getItem("conversationData") || "";
    if (parse(conversionDataReceived)) setConversationData(parse(conversionDataReceived))
    if (!parse(dataReceived) && !parse(conversionDataReceived)) {
      nav.goBack()
    }



  }, []))

  useEffect(() => {
    switch (messagingData?.type) {
      case "driving-chat":
        setSuggestions(suggestionsJson);
        break;
      case "property-chat":
        setSuggestions(propertyChatSuggestions);
        break;
      default:
        setSuggestions([]);
    }
  }, [messagingData]);
  const dispatch = useDispatch();
  const {  } = useSelector((root: { app: appstate }) => root.app);

  const [isNewConversation, setIsNewConversation] = useState(false)
  useEffect(() => {
    if (messagingData) {
      if (messagingData.personId && messagingData.action && messagingData.type) {

        setIsNewConversation(true);
        getPartnerProfile((messagingData.personId || "").toString())
        SecureStorage.setItem("messagingData", "")//reset
      }
    }
  }, [messagingData])

  const renderMessageItem = ({ item }: { item: message }) => {
    if (item.messageBusinessId) return <BusinessChatMessage message={item} />
    const isMyMessage = item.senderId === user?.userId;
    const date = getTimeAgoString(item?.sentAt)
    const status = item.status || 'delivered'
    return (
      <View style={isMyMessage ? styles.myMessageItem : styles.otherMessageItem}>
        {!isMyMessage && item?.senderPicture && <Image source={{ uri: item.senderPicture }} style={styles.avatar} />}
        <View style={styles.messageContent}>
          <Text style={styles.timestamp}>{date} {moment(item.sentAt).format('hh:mm A, MMM D YYYY')}</Text>
          <View style={isMyMessage ? styles.myMessageBubble : styles.otherMessageBubble}>
            <Text style={isMyMessage ? styles.myMessageText : styles.otherMessageText}>
              {item.text}
            </Text>
            {isMyMessage && <Text style={{ fontSize: 10, fontStyle: "italic", color: isMyMessage ? "#a6edc9" : "#192921" }}>{status} {status.trim().toLocaleLowerCase() == "read" && <FontAwesome5 size={8} color={"#a6edc9"} name={"check-double"} />}</Text>}

          </View>
        </View>
      </View>
    )
  }

  const renderSuggestionItem = ({ item }: { item: string }) => (
    <TouchableOpacity onPress={() => handleInputChange(item)} style={styles.suggestionItem}>
      <Text style={styles.suggestionText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => nav.goBack()}>
          <Ionicons name="arrow-back-outline" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{partnerProfile ? partnerProfile.fullname : partnerUser ? partnerUser?.fullname : <Skeleton width={100} height={20} />}</Text>
        <View style={[globStyle.flexItem, globStyle.alignCenter, globStyle.justifyEnd, globStyle.flexGap5]}>
          <TouchableOpacity style={styles.callButton}
          //        onPress={handlePhoneCall(.guest.phoneNumber)}
          >
            <FontAwesome name="phone" size={24} color="#4460EF" />
          </TouchableOpacity>


       
        </View>

      </View>
      <Text style={styles.subHeader}>
        Keep your account safe - never share personal information in this conversation.
      </Text>
      <FlatList
        ref={messagesRef}

        onContentSizeChange={() => messagesRef.current?.scrollToEnd({ animated: true })}

        data={messages}
        renderItem={renderMessageItem}
        keyExtractor={(item) => item.docId || Date.now().toString()}
        contentContainerStyle={styles.messageList}
      />
      <View>
        <FlatList

          data={suggestions}
          renderItem={renderSuggestionItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.suggestionList}
        />
      </View>
      <KeyboardAvoidingView style={styles.inputContainer}>
        {/* <TouchableOpacity style={styles.plusButton}>
          <AntDesign name="plus" size={24} color="black" />
        </TouchableOpacity> */}
        <TextInput
          style={styles.textInput}
          placeholder="Type your message..."
          placeholderTextColor="#888"
          value={inputText}
          onChangeText={handleInputChange}
        />
        <TouchableOpacity disabled={!inputText || sending} style={[styles.sendButton]} onPress={() => handleSendPress()}>

          {sending ? <ActivityIndicator color="#fff" size="small" /> : <FontAwesome name="send" size={24} color="#fff" />}

        </TouchableOpacity>
      </KeyboardAvoidingView>

      <Modal
        visible={businessModalWarning}
        transparent
        statusBarTranslucent
        animationType="slide"
        onRequestClose={() => setBusinessModalWarning(false)}
      >
        <TouchableWithoutFeedback onPress={() => console.log("do nothing")}>
          <View style={styles.modalBackground}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <View style={styles.dragIndicator} />
                <Text style={styles.title}>Start a new business?</Text>
                <Text style={styles.message}>

                  This action will initiate a brand-new business collaboration with this partner, which will be added as a separate entry alongside your current ongoing businesses. It will not replace or interfere with any existing businesses, but instead function independently as a distinct venture.
                </Text>

                <View style={styles.buttonWrapper}>
                  <TouchableOpacity
                    style={[styles.button, styles.buttonCancel]}
                    onPress={() => {
                      setBusinessModalWarning(false);
                      setNewBusiness(null)
                      SecureStorage.deleteItemAsync("businessData");
                    }}
                  >
                    <Text style={styles.buttonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, styles.buttonConfirm]}
                    onPress={handleConfirmNewConversation}
                  >
                    <Text style={styles.buttonText}>{creatingBusiness ? <ActivityIndicator color="#fff" size="small" /> : "Confirm"}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>



    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  backButton: {
    backgroundColor: colors.white,
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.grey,
    marginVertical: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  callButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: 26,
    width: 45,
    alignItems: "center",
    justifyContent: "center",
  },
  subHeader: {
    textAlign: 'center',
    padding: 10,
    fontSize: 12,
    color: '#888',
    backgroundColor: '#f9f9f9',
  },
  messageList: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  messageItem: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'flex-end',
  },
  myMessageItem: {
    flexDirection: 'row-reverse',
    marginBottom: 20,
    alignItems: 'flex-end',
  },
  otherMessageItem: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'flex-end',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    marginLeft: 10,
  },
  messageContent: {
    maxWidth: '75%',
  },
  timestamp: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
    marginBottom: 5,
  },
  messageBubble: {
    padding: 10,
    borderRadius: 10,
  },
  myMessageBubble: {
    backgroundColor: '#4460EF',
    borderRadius: 10,
    padding: 10,
  },
  otherMessageBubble: {
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    padding: 10,
  },
  myMessageText: {
    color: '#fff',
  },
  otherMessageText: {
    color: '#000',
  },
  suggestionList: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  suggestionItem: {
    backgroundColor: colors.grey,
    padding: 10,
    borderRadius: 20,
    marginHorizontal: 5,
    alignItems: "center",
  },
  suggestionText: {
    color: '#000',
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopColor: '#ddd',
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  textInput: {
    flex: 1,
    height: 50,
    borderRadius: 30,
    paddingHorizontal: 15,
    backgroundColor: colors.grey,
    marginHorizontal: 10,
  },
  sendButton: {
    backgroundColor: '#4460EF',
    padding: 10,
    borderRadius: 30,
    paddingHorizontal: 15,
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  plusButton: {
    backgroundColor: colors.grey,
    padding: 11,
    borderRadius: 7,
  },

  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    minHeight: 250,
    elevation: 10,
  },
  dragIndicator: {
    width: 40,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 3,
    alignSelf: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0D1317',
    textAlign: 'center',
  },
  message: {
    fontSize: 14,
    color: '#0D1317',
    textAlign: 'center',
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonCancel: {
    backgroundColor: '#e0e0e0',
  },
  buttonConfirm: {
    backgroundColor: '#007BFF',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default ChatScreen;