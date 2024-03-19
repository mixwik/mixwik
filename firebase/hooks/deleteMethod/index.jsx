import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '../../initialize'

export const deletePublication = async (category, id, uid, deleteCategory) => {
  const userRef = doc(db, category, id)
  await deleteDoc(userRef)
    .then(async () => {
      await fetch('/api/update-publication-count', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ category, uid, number: -1 })
      })
    })
}
