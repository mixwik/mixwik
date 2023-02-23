import { collection, addDoc } from 'firebase/firestore'
import { db } from '../../initialize'

export const setCsgo = async (value, userData, img) => {
  // Add a new document with a generated id.
  await addDoc(collection(db, 'csgo'), {
    position: value.position,
    level: value.level,
    typeOfGamer: value.typeOfGamer,
    hours: value.hours,
    description: value.description,
    uid: userData.uid,
    geometry: userData.geometry,
    age: userData.age,
    img
  })
}
