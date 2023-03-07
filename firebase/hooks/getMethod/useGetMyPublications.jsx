import { useEffect, useState } from 'react'
import { collection, getDocs, where, query } from 'firebase/firestore'
import { db } from '../../initialize.jsx'

export const useGetMyPublications = (name, uid) => {
  const [data, setData] = useState([])
  useEffect(() => {
    const getData = async () => {
      const arrData = []
      const querySnapshot = await getDocs(query(collection(db, name), where('uid', '==', uid)))
      querySnapshot.forEach((doc) => {
        arrData.push({ id: doc.id, ...doc.data() })
      })
      setData(arrData)
    }
    if (uid && name) getData()
  }, [uid, name])
  return data
}
