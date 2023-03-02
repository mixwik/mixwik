import { useEffect, useState } from 'react'
import { collection, query, onSnapshot } from 'firebase/firestore'
import { db } from '../../firebase/initialize.jsx'

export const useGetChats = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    const q = query(collection(db, 'chats'))
    const unSub = onSnapshot(q, (querySnapshot) => {
      const arrData = []
      querySnapshot.forEach((doc) => {
        arrData.push({ id: doc.id, ...doc.data() })
      })
      setData(arrData)
    })
    return () => unSub()
  }, [])
  return data
}
