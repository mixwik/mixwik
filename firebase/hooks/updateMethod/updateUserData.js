import { doc, increment, updateDoc } from 'firebase/firestore'
import { db } from '../../initialize.jsx'

export const updateUserData = async (id, data) => {
  const userRef = doc(db, 'users', id)
  await updateDoc(userRef, {
    name: data.name,
    age: data.age,
    gender: data.gender,
    description: data.description
  })
}

export const updateUserCsgoPublications = async (id) => {
  const userRef = doc(db, 'users', id)
  await updateDoc(userRef, {
    csgoPublications: increment(1)
  })
}
