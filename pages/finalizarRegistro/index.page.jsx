import { isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { auth } from '../../firebase/initialize'
import { useRouter } from 'next/router'

const FinishRegistrationPage = () => {
  const [existEmail, setExistEmail] = useState(false)
  const [confirmationEmail, setConfirmationEmail] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const confirmRegistration = (email) => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      signInWithEmailLink(auth, email, window.location.href)
        .then((result) => {
          window.localStorage.removeItem('emailForSignIn')
          setError('correcto')
          router.push('/dashboard')
        })
        .catch(() => {
          setError('Ups, algo salió mal')
        })
    } else {
      setError('El enlace no es válido')
    }
  }

  useEffect(() => {
    const email = window.localStorage.getItem('emailForSignIn')
    if (!email) {
      setExistEmail(true)
    } else {
      confirmRegistration(email)
    }
  }, [])

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-white'>
      <div class='fixed inset-0 -z-10 h-full w-full bg-slate-50 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]' />
      <div className='relative w-full mx-3 sm:mx-0 sm:max-w-sm'>
        <div className='absolute w-full h-full transform shadow-lg card bg-aero rounded-3xl -rotate-6' />
        <div className='absolute w-full h-full transform shadow-lg card bg-pennBlue rounded-3xl rotate-6' />
        <div className='relative flex flex-col w-full gap-10 px-6 py-4 bg-gray-100 shadow-md rounded-3xl'>
          {existEmail
            ? (
              <>
                <label htmlFor='email' className='text-xl font-bold text-center'>Confirma tu email</label>
                <input
                  className='block w-full mt-1 bg-gray-100 border-none shadow-lg h-11 rounded-xl hover:bg-blue-100 focus:bg-blue-100 focus:ring-0'
                  type='email'
                  placeholder='Email'
                  value={confirmationEmail}
                  onChange={(e) => setConfirmationEmail(e.target.value)}
                />
                <button disabled={!confirmationEmail} className='w-full py-3 text-white transition duration-500 ease-in-out transform shadow-xl bg-pennBlue rounded-xl hover:shadow-inner focus:outline-none hover:-translate-x hover:scale-105 disabled:bg-slate-600 disabled:cursor-not-allowed' onClick={() => confirmRegistration(confirmationEmail)}>Finalizar Registro</button>
              </>
              )
            : (
              <p className='py-10'>Verificando, por favor espera...</p>
              )}
          {error && <p>{error}</p>}
        </div>
      </div>
    </div>
  )
}

export default FinishRegistrationPage
