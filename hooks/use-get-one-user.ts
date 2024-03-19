import { useEffect, useState } from 'react'
import { UserServer } from '../domain/types'
import { useRouter } from 'next/router'

export const useGetOneUser = (uid) => {
  const router = useRouter()
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
        if (data.userServer.ban) router.push('/ban')
        if (data.userServer.admonition >= 3) router.push('/ban')
        setIsData(data.user)
        setUserServer(data.userServer)
      } else if (data.user === 'no-data') {
        setIsData(data.user)
      }
    })()
  }, [uid, refetch])
  return { userServer, isData, setRefetch }
}
