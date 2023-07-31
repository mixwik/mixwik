import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { db } from '../../../firebase/initialize'

export const setAddFavorites = async (id, data) => {
  const userRef = doc(db, 'users', id)
  await updateDoc(userRef, {
    likes: arrayUnion(data)
  })
}
