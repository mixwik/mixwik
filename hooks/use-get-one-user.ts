import { useEffect, useState } from 'react'
import { UserServer } from '../domain/types'

export const useGetOneUser = (uid) => {
  const [userServer, setUserServer] = useState({} as UserServer)
  const [isData, setIsData] = useState('')
  const [refetch, setRefetch] = useState(false)
  useEffect(() => {
    (async () => {
      const user = await fetch('/api/get-one-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ uid })
      })
      const data = await user.json()
      if (data.user === 'data') {
        setIsData(data.user)
        setUserServer(data.userServer)
      } else if (data.user === 'no-data') {
        setIsData(data.user)
      }
    })()
    console.log('refetch', refetch)
  }, [uid, refetch])
  return { userServer, isData, setRefetch }
}
