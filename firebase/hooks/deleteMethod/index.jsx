import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '../../initialize'

export const deletePublication = async (category, id) => {
  const userRef = doc(db, category, id)
  await deleteDoc(userRef)
}
