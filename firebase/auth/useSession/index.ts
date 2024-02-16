import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { UserProvider } from '../../../domain/types'
import { auth } from '../../initialize'

export const useSession = () => {
  const [userProvider, setUserProvider] = useState<UserProvider>()
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserProvider({
          name: user.displayName,
          email: user.email,
          image: user.photoURL,
          uid: user.uid
        })
      }
    })
  }, [])
  return { userProvider }
}
