import { collection, addDoc } from 'firebase/firestore'
import { db } from '../../initialize'

export const setNewUser = async (value, geometry, user, img) => {
  // Add a new document with a generated id.
  await addDoc(collection(db, 'users'), {
    name: value.name,
    age: value.age,
    gender: value.gender,
    description: value.description,
    geometry,
    uid: user.uid,
    profileImg: img || user.image,
    email: user.email
  })
}
