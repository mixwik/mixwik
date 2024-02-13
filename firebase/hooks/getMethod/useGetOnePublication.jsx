import { doc, getDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../../initialize'

export const useGetOnePublication = (name, id) => {
  const [data, setData] = useState({})

  useEffect(() => {
    const getPublication = async () => {
      const docRef = doc(db, name, id)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        setData(docSnap.data())
      } else {
        console.log('No such document!')
      }
    }
    if (name && id) getPublication()
  }, [id, name])

  return data
}
