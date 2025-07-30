import {
    doc,
    collection,
    setDoc,
    addDoc,
    getDoc,
    updateDoc,
    serverTimestamp
  } from "firebase/firestore";
import { message, messages_relationShips } from "../types/message.interface";
import { db } from "@/firebase.config";
  
/**
 * Sends a message and updates the message relationships in the database.
 *
 * This function performs the following actions:
 * 1. Adds a message to the specified messages collection.
 * 2. Updates or creates a relationship document in the "messages_relationShips" collection.
 * 
 * @param {Object} params - The parameters for sending a message.
 * @param {string} params.messageCollection - The name of the message collection.
 * @param {string} params.senderId - The ID of the sender.
 * @param {string} params.receiverId - The ID of the receiver.
 * @param {string} params.senderPicture - The picture URL of the sender.
 * @param {string} params.text - The text content of the message.
 * @param {any[]} [params.files] - Optional array of files attached to the message.
 * @param {string} params.partnerId - The ID of the partner in the relationship.
 * @param {string} params.personId - The ID of the person in the relationship.
 * @param {string} params.personName - The name of the person in the relationship.
 * @param {string} params.partnerName - The name of the partner in the relationship.
 * @param {string} params.partnerPicture - The picture URL of the partner.
 * @param {string} params.personPicture - The picture URL of the person.
 * 
 * @returns {Promise<Object>} An object containing the success status and the message ID.
 * 
 * @throws Will throw an error if adding or updating documents in Firestore fails.
 */

export async function sendMessage({
  messageCollection,
  senderId,
  receiverId,
  senderPicture,
  text,
  files = [],
  partnerId,
  personId,
  personName,
  partnerName,
  partnerPicture,
  personPicture,
  isNewConversation = false,
}: {
  messageCollection: string;
  senderId: string;
  receiverId: string;
  senderPicture: string;
  text: string;
  files?: any[];
  partnerId: string;
  personId: string;
  personName: string;
  partnerName: string;
  partnerPicture: string;
  personPicture: string;
  isNewConversation?: boolean;
},addionalProps:message|any={}) {
  const message: message = {
    text,
    files,
    sentAt: new Date().toISOString(),
    receivedAt: '',
    status: 'sent',
    senderId,
    senderPicture,
    receiverId,
    type: 'text',
    ...addionalProps
  };

  // 1. Add the message to Firestore
  const messageRef = collection(db, messageCollection);
  const addedMessage = await addDoc(messageRef, message);
  const docId = addedMessage.id;

  // Add the docId to the message
  message.docId = docId;

  // 2. Handle the relationship document
  const relationRef = doc(db, 'messages_relationShips', messageCollection);
  const relationSnap = await getDoc(relationRef);

  let relationship: messages_relationShips | null = null;

  if (!relationSnap.exists()) {
    relationship = {
      personId,
      personName,
      personPicture,
      partnerId,
      partnerName,
      partnerPicture,
      messageCollection,
      messages: [],
      lastMessage: message,
      createdAt: new Date().toISOString(),
      initiatedBy: senderId,
    };

    await setDoc(relationRef, relationship);
  } else {
    await updateDoc(relationRef, {
      lastMessage: message,
    });

    if (isNewConversation) {
      // If needed, fetch the updated relationship doc
      const updatedSnap = await getDoc(relationRef);
      relationship = updatedSnap.data() as messages_relationShips;
    }
  }

  return {
    success: true,
    messageId: docId,
    relationship: isNewConversation ? relationship : undefined,
  };
}
