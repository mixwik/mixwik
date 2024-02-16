import { collection, getDocs, query, where } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { User } from '../../../domain/types.js'
import { db } from '../../initialize.jsx'

export const useGetOneUser = (uid) => {
  const [user, setUser] = useState<User>()
  useEffect(() => {
    const getData = async () => {
      const querySnapshot = await getDocs(query(collection(db, 'users'), where('uid', '==', uid)))
      querySnapshot.forEach((doc) => {
        setUser({
          ...doc.data().user,
          id: doc.id
        })
      })
    }
    if (uid) getData()
  }, [uid])
  return { user }
}
