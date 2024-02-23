import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { COLLECTIONS } from '../../constants.js'
import { db } from '../../initialize.jsx'

export const updateChatUid = async (id, data) => {
  const userRef = doc(db, COLLECTIONS.users, id)
  await updateDoc(userRef, {
    chatsUids: arrayUnion(data)
  })
}
