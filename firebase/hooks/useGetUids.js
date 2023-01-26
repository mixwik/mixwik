import { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../initialize.jsx'

export const useGetUids = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    const getData = async () => {
      const arrData = []
      const querySnapshot = await getDocs(collection(db, 'uids'))
      querySnapshot.forEach((doc) => {
        arrData.push({ ...doc.data() })
      })
      setData(arrData)
    }
    getData()
  }, [])
  return data
}
