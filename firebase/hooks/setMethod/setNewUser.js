import { collection, addDoc } from 'firebase/firestore'
import { db } from '../../initialize'

export const setNewUser = async (name, age, gender, description, geometry, uid) => {
  // Add a new document with a generated id.
  await addDoc(collection(db, 'users'), {
    name,
    age,
    gender,
    description,
    geometry,
    uid
  })
}
