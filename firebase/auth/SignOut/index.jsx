import { signOut } from 'firebase/auth'
import { auth } from '../../initialize'
import { useRouter } from 'next/router'

export const useSignOut = () => {
  const router = useRouter()

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        router.replace('/')
      })
      .catch(() => {

      })
  }
  return handleSignOut
}
