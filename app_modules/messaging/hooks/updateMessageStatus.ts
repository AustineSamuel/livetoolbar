import { db } from "@/firebase.config";
import { doc, updateDoc } from "firebase/firestore";

/**
 * Updates the status of a message in Firestore.
 *
 * @param {string} messageCollection - The Firestore collection name where the message is stored.
 * @param {string} docId - The document ID of the message.
 * @param {string} newStatus - The new status to set (e.g., 'read', 'seen', etc.).
 * 
 * @returns {Promise<void>} Resolves when the update is successful.
 * 
 * @throws Will throw an error if updating the document fails.
 */
export async function updateMessageStatus(
  messageCollection: string,
  docId: string,
  newStatus: 'sent'| "delivered" | "read" | "seen" | 'failed'
): Promise<void> {
  try {
    const messageDocRef = doc(db, messageCollection, docId);

    await updateDoc(messageDocRef, {
      status: newStatus,
      receivedAt: new Date().toISOString(), // Optional: update when it was read
    });

    console.log(`Message ${docId} status updated to ${newStatus}`);
  } catch (error) {
    console.error("Failed to update message status:", error);
    throw error;
  }
}
