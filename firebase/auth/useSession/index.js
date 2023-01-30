import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../initialize'

export const useSession = () => {
  const [user, setUser] = useState({})
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          name: user.displayName,
          email: user.email,
          image: user.photoURL,
          uid: user.uid
        })
      } else {
        console.log('Sesión cerrada')
      }
    })
  }, [])
  return user
}
