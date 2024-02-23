import { collection, getDocs, query, where } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { COLLECTIONS } from '../../../domain/constants.js'
import { User } from '../../../domain/types.js'
import { db } from '../../initialize.jsx'

export const useGetOneUser = (uid) => {
  const [isData, setIsData] = useState('')
  const [user, setUser] = useState<User>()
  useEffect(() => {
    const getData = async () => {
      const querySnapshot = await getDocs(query(collection(db, COLLECTIONS.users), where('uid', '==', uid)))
      if (querySnapshot.empty) setIsData('no-data')
      querySnapshot.forEach((doc) => {
        setUser({
          ...doc.data(),
          id: doc.id
        } as User)
      })
    }
    if (uid) getData()
  }, [uid])
  return { user, isData }
}
