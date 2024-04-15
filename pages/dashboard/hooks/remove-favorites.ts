import { arrayRemove, doc, updateDoc } from 'firebase/firestore'
import { COLLECTIONS } from '../../../domain/constants'
import { db } from '../../../firebase/initialize'

export const removeFavorites = async (uid, data) => {
  const userRef = doc(db, COLLECTIONS.users, uid)
  await updateDoc(userRef, {
    likes: arrayRemove(data)
  })
}
