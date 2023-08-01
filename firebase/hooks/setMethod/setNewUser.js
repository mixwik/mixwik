import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../initialize'

export const setNewUser = async (value, geometry, user, profileImg) => {
  // Add a new document with a generated id.
  await addDoc(collection(db, 'users'), {
    name: value.name,
    age: value.age,
    gender: value.gender,
    description: value.description,
    geometry,
    uid: user.uid,
    email: user.email,
    profileImg,
    ban: false,
    admonition: 0,
    cs2Publications: 0,
    fortnitePublications: 0,
    valorantPublications: 0,
    lolPublications: 0
  })
}
