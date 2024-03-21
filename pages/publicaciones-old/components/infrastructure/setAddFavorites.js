import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { db } from '../../../../firebase/initialize'
import { COLLECTIONS } from '../../../../domain/constants'

export const setAddFavorites = async (id, data) => {
  const userRef = doc(db, COLLECTIONS.users, id)
  await updateDoc(userRef, {
    likes: arrayUnion(data)
  })
}
