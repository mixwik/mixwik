import { deleteDoc, doc } from 'firebase/firestore'
import toast from 'react-hot-toast'
import { db } from '../../initialize'

export const deletePublication = async (category, id) => {
  const userRef = doc(db, category, id)
  await deleteDoc(userRef)
    .then(async () => {
      toast.success('Publicación eliminada correctamente')
    })
}
