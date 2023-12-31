import { collection, getDocs } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../../initialize.jsx'

export const useGetData = (name) => {
  const [data, setData] = useState([])
  useEffect(() => {
    const getData = async () => {
      const arrData = []
      const querySnapshot = await getDocs(collection(db, name))
      querySnapshot.forEach((doc) => {
        arrData.push({ id: doc.id, ...doc.data() })
      })
      setData(arrData)
    }
    getData()
  }, [name])
  return data
}
