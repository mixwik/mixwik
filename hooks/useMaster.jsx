import { useEffect, useState } from 'react'
import { useSession } from '../firebase/auth/useSession'

export const useMaster = () => {
  const [master, setMaster] = useState(false)
  const { userProvider } = useSession()
  const master1 = process.env.NEXT_PUBLIC_MASTER1
  const master2 = process.env.NEXT_PUBLIC_MASTER2

  useEffect(() => {
    if (userProvider?.uid === master1 || userProvider?.uid === master2) {
      setMaster(true)
    } else {
      setMaster(false)
    }
  }, [master1, master2, userProvider?.uid])

  return { master }
}
