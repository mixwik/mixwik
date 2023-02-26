import { collection, addDoc } from 'firebase/firestore'
import { db } from '../../initialize'

export const setNewChat = async (value, user) => {
  await addDoc(collection(db, 'chat'), {
    uidA: value.nameA,
    uidB: value.nameB,
    uid: user.uid,
    profileImg: user.image
  })
}
