import { arrayRemove, doc, updateDoc } from 'firebase/firestore'
import { COLLECTIONS } from '../../../../domain/constants'
import { db } from '../../../../firebase/initialize'

export const setRemoveFavorites = async (id, data) => {
  const userRef = doc(db, COLLECTIONS.users, id)
  await updateDoc(userRef, {
    likes: arrayRemove(data)
  })
}
