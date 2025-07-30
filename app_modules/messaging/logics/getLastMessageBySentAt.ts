import { getFirestore, collection, query, orderBy, limit, getDocs } from 'firebase/firestore';

const db = getFirestore();

const getLastMessage = async (collectionName:string) => {
  const messagesRef = collection(db, collectionName); // replace 'messages' with your collection name
  const q = query(messagesRef, orderBy('sentAt', 'desc'), limit(1));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const lastMessage = querySnapshot.docs[0].data();
    console.log('Last message:', lastMessage);
    return lastMessage;
  } else {
    console.log('No messages found.');
    return null;
  }
};

export default getLastMessage;