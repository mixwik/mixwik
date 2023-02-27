import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { db } from '../../initialize.jsx'

export const updateUserData = async (id, data) => {
  const userRef = doc(db, 'users', id)
  await updateDoc(userRef, {
    name: data.name,
    age: data.age,
    gender: data.gender,
    description: data.description
  })
}

export const updateChatUid = async (id, data) => {
  const userRef = doc(db, 'users', id)
  await updateDoc(userRef, {
    chatsUids: arrayUnion(data)
  })
}
