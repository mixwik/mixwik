import { getAuth, signInWithPopup } from 'firebase/auth'
import { useRouter } from 'next/router'

export const useLogIn = () => {
  const router = useRouter()
  const auth = getAuth()
  const logIn = (provider) => {
    signInWithPopup(auth, provider)
      .then(() => {
        router.push('/dashboard')
      }).catch((error) => {
        console.log(error)
      })
  }
  return logIn
}
