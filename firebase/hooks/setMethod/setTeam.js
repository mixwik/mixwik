import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../initialize'
import { COLLECTIONS } from '../../../domain/constants'

export const setTeam = async (category, value, geometry, userData, img, name, img2, name2, img3, name3, img4, name4, img5, name5, img6, name6, img7, name7) => {
  // Add a new document with a generated id.
  await addDoc(collection(db, COLLECTIONS.teams), {
    category,
    position: value.position,
    level: value.level,
    premier: value.premier,
    typeOfGamer: value.typeOfGamer,
    hours: value.hours,
    title: value.title,
    description: value.description,
    uid: userData.uid,
    geometry,
    age: userData.age,
    img: {
      url: img,
      name
    },
    img2: {
      url: img2 || '',
      name: name2 || ''
    },
    img3: {
      url: img3 || '',
      name: name3 || ''
    },
    img4: {
      url: img4 || '',
      name: name4 || ''
    },
    img5: {
      url: img5 || '',
      name: name5 || ''
    },
    img6: {
      url: img6 || '',
      name: name6 || ''
    },
    img7: {
      url: img7 || '',
      name: name7 || ''
    }
  })
}
