import { arrayRemove, doc, updateDoc } from 'firebase/firestore'
import { db } from '../../../../firebase/initialize'

export const setRemoveFavorites = async (id, data) => {
  const userRef = doc(db, 'users', id)
  await updateDoc(userRef, {
    likes: arrayRemove(data)
  })
}
