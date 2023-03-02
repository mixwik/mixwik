import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase/initialize.jsx'

export const updateChat = async (id, name, message) => {
  const userRef = doc(db, 'chats', id)
  await updateDoc(userRef, {
    messages: arrayUnion({
      date: new Date(),
      name,
      message
    })
  })
}
