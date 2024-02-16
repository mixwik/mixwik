import { sendSignInLinkToEmail } from 'firebase/auth'
import { useState } from 'react'
import { auth } from '../../initialize'

export const useRegister = () => {
  const [errorRegister, setErrorRegister] = useState(false)
  const [successRegister, setSuccessRegister] = useState(false)
  const actionCodeSettings = {
    url: 'https://mixwik.com/finalizarRegistro',
    handleCodeInApp: true
  }

  const register = (email) => {
    sendSignInLinkToEmail(auth, email, actionCodeSettings)
      .then(() => {
        window.localStorage.setItem('emailForSignIn', email)
        setSuccessRegister(true)
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        setErrorRegister(errorCode, errorMessage)
        console.error(errorCode, errorMessage)
      })
  }
  return { errorRegister, successRegister, register }
}
