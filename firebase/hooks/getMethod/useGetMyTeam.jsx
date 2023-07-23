import { collection, getDocs, query, where } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../../initialize.jsx'

export const useGetMyTeams = (name, category, uid) => {
  const [data, setData] = useState([])
  useEffect(() => {
    const getData = async () => {
      const arrData = []
      const querySnapshot = await getDocs(query(collection(db, name), where('uid', '==', uid), where('category', '==', category)))
      querySnapshot.forEach((doc) => {
        arrData.push({ id: doc.id, ...doc.data() })
      })
      setData(arrData)
    }
    if (uid && name) getData()
  }, [uid, name, category])
  return data
}
