import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  getDocs,
  where
} from "firebase/firestore";
import { messages_relationShips, message } from "../types/message.interface";
import { db } from "@/firebase.config";

/**
 * Gets the message relationships for a given user id, including full messages.
 *
 * @param {string} userId
 * @returns {{
 *   relationships: (messages_relationShips & { messages: message[] })[],
 *   loading: boolean
 * }}
 */
export function useMessageRelationships(userId: string) {
  const [relationships, setRelationships] = useState<(messages_relationShips & { messages: message[] })[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!userId) return;
    setLoading(true);

    const q = query(
      collection(db, "messages_relationShips"),
      orderBy("lastMessage.sentAt", "desc")
    );

    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const docs = snapshot.docs
        .map((doc) => doc.data() as messages_relationShips)
        .filter(
          (r) =>
            r.personId === userId ||
            r.partnerId === userId ||
            r.initiatedBy === userId
        );

      const relationshipsWithMessages = await Promise.all(
        docs.map(async (relationship) => {
          const messagesSnapshot = await getDocs(
            query(
              collection(db, relationship.messageCollection),
              orderBy("sentAt", "asc")
            )
          );
          const messages: message[] = messagesSnapshot.docs.map((doc) => ({
            ...doc.data(),
            docId: doc.id,
          })) as message[];

          return {
            ...relationship,
            messages,
          };
        })
      );

      setRelationships(relationshipsWithMessages);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [userId]);

  return { relationships, loading };
}
