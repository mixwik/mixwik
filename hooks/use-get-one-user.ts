import { useEffect, useState } from 'react'
import { UserServer } from '../domain/types'

export const useGetOneUser = (uid) => {
  const [userServer, setUserServer] = useState({} as UserServer)
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
      setUserServer(data.userServer)
    })()
  }, [uid])
  return { userServer }
}
