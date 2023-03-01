import { collection, addDoc } from 'firebase/firestore'
import { db } from '../../../firebase/initialize.jsx'

export const setNewChat = async (ownerUid, participant, message, currentName) => {
  await addDoc(collection(db, 'chats'), {
    ownerUid,
    participant,
    messages: [
      {
        date: new Date(),
        name: currentName,
        message
      }
    ]
  })
}
