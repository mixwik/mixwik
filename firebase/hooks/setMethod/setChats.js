import { collection, addDoc } from 'firebase/firestore'
import { db } from '../../../firebase/initialize.jsx'

export const setNewChat = async (uidA, uidB, name, profileImg, message, currentName) => {
  await addDoc(collection(db, 'chats'), {
    uids: [uidA, uidB],
    name,
    profileImg,
    messages: [
      {
        date: new Date(),
        name: currentName,
        message
      }
    ],
    read: false
  })
}
