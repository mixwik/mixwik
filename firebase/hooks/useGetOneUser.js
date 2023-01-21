import { useEffect, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../initialize.jsx'

export const useGetOneUser = (id) => {
  console.log(id)
  const [data, setData] = useState({})
  useEffect(() => {
    const getData = async () => {
      const docRef = doc(db, 'usuarios', `${id}`)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        setData({ ...docSnap.data() })
      } else {
        console.log('No such document!')
      }
    }
    getData()
  }, [id])
  console.log(data)
  return data
}
