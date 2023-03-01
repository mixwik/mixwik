import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'next/router'
import { auth } from '../../initialize'

export const useRegister = () => {
  const router = useRouter()
  const register = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        router.push('/dashboard')
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorCode, errorMessage)
      })
  }

  return register
}
