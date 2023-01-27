import { doc, updateDoc, arrayUnion } from 'firebase/firestore'
import { db } from '../../initialize'

export const setUids = async (uid) => {
  const washingtonRef = doc(db, 'uids', '73I9v406H6d6nNFyiMj8')

  await updateDoc(washingtonRef, {
    uids: arrayUnion(uid)
  })
}
