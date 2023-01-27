import { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../initialize.jsx'

export const useGetUids = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    const getData = async () => {
      const querySnapshot = await getDocs(collection(db, 'uids'))
      querySnapshot.forEach((doc) => {
        setData(doc.data().uids)
      })
    }
    getData()
  }, [])
  return data
}
