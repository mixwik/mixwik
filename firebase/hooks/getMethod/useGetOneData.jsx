import { collection, getDocs, query, where } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../../initialize.jsx'

export const useGetOneData = (name, uid) => {
  const [data, setData] = useState([])
  useEffect(() => {
    const getData = async () => {
      const querySnapshot = await getDocs(query(collection(db, name), where('uid', '==', uid)))
      querySnapshot.forEach((doc) => {
        setData({ id: doc.id, ...doc.data() })
      })
    }
    if (uid && name) getData()
  }, [uid, name])
  return data
}
