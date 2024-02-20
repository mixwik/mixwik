import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useLogInOpenContext } from '../../../context'
import { auth } from '../../initialize'

export const useLogInProvider = () => {
  const { setLogInOpen } = useLogInOpenContext()
  const [error, setError] = useState(false)
  const router = useRouter()
  const logInProvider = (provider) => {
    signInWithPopup(auth, provider)
      .then(() => {
        router.push('/dashboard?page=profile')
        setLogInOpen(false)
      }).catch((error) => {
        setError(error)
      })
  }
  return [error, logInProvider]
}

export const useLogInEmail = () => {
  const [error, setError] = useState(false)
  const router = useRouter()
  const logInEmail = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        router.push('/dashboard')
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        setError(errorCode, errorMessage)
      })
  }
  return [error, logInEmail]
}
