import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase/initialize'

export const getData = async (name) => {
  return await getDocs(collection(db, name))
}
