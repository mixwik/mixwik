import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../initialize'

export const setBugs = async (name, email, message, setBug) => {
  // Add a new document with a generated id.
  await addDoc(collection(db, 'bugs'), {
    name,
    email,
    message,
    resolved: false
  }).then(() => {
    setBug(false)
  })
}
