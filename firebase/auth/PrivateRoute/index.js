
import { onAuthStateChanged } from 'firebase/auth'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { auth } from '../../initialize'

const PrivateRoute = ({ children }) => {
  const router = useRouter()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/')
      }
    })
  }, [router])

  return <>{children}</>
}

export default PrivateRoute
