import { useEffect, useState } from 'react'
import { useSession } from '../firebase/auth/useSession'
import { useGetOneUser } from './use-get-one-user'

export const useMaster = () => {
  const [master, setMaster] = useState(false)
  const { userProvider } = useSession()
  const { userServer } = useGetOneUser(userProvider?.uid)

  useEffect(() => {
    if (userServer?.rol === 'admin') {
      setMaster(true)
    } else {
      setMaster(false)
    }
  }, [userServer?.rol])

  return { master }
}
