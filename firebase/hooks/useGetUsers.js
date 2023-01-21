import { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../initialize.jsx'

export const useGetUsers = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    const getData = async () => {
      const arrData = []
      const querySnapshot = await getDocs(collection(db, 'usuarios'))
      querySnapshot.forEach((doc) => {
        arrData.push({ id: doc.id, ...doc.data() })
      })
      setData(arrData)
    }
    getData()
  }, [])
  return data
}
