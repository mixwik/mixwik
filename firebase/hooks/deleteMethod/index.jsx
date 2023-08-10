import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '../../initialize'
import { updateUserNumberPublications } from '../updateMethod/updateUserData'

export const deletePublication = async (category, id, userID, deleteCategory) => {
  const userRef = doc(db, category, id)
  await deleteDoc(userRef)
    .then(() => {
      updateUserNumberPublications(deleteCategory, userID, -1)
    })
}
