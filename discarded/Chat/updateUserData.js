import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { db } from '../../initialize.jsx'

export const updateChatUid = async (id, data) => {
  const userRef = doc(db, 'users', id)
  await updateDoc(userRef, {
    chatsUids: arrayUnion(data)
  })
}
