import { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'next/router'
import { auth } from '../../initialize'

export const useRegister = () => {
  const [errorRegister, setErrorRegister] = useState(false)
  const router = useRouter()
  const register = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        router.push('/dashboard')
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        setErrorRegister(errorCode, errorMessage)
      })
  }

  return [errorRegister, register]
}
