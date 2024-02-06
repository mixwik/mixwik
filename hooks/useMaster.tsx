import { useEffect, useState } from 'react'
import { useSession } from '../firebase/auth/useSession'

export const useMaster = () => {
  const [master, setMaster] = useState(false)
  const user = useSession()
  const master1 = process.env.NEXT_PUBLIC_MASTER1
  const master2 = process.env.NEXT_PUBLIC_MASTER2
  console.log(master)
  console.log(master1)
  console.log(master2)
  console.log(user)

  useEffect(() => {
    if (user.uid === master1 || user.uid === master2) {
      setMaster(true)
    } else {
      setMaster(false)
    }
  }, [master1, master2, user.uid])

  return { master }
}
