import { useRef } from 'react'
// Styles

// LogIn
import { GoogleAuthProvider } from 'firebase/auth'
import { useLogInProvider } from '../../firebase/auth/useLogIn'

// Icons
import { useLogInOpenContext } from '../../context'
import { useRegister } from '../../firebase/auth/register'
import { FinishRegistration } from './components/finish-registration'

export const LogIn = () => {
  const { logInOpen, setLogInOpen } = useLogInOpenContext()
  const emailRef = useRef()

  const { register, successRegister, errorRegister } = useRegister()
  const [errorProvider, logInProvider] = useLogInProvider()
  const google = new GoogleAuthProvider()

  const handleLoginProvider = (provider) => {
    logInProvider(provider)
  }
  const handleRegister = (e) => {
    e.preventDefault()
    register(emailRef.current.value)
  }

  return (
    <div className={`fixed md:bottom-0 md:top-auto top-0 z-50 w-screen font-sans ${logInOpen ? 'translate-y-0' : 'translate-y-[100vh]'} transition-all duration-500`}>
      {
        successRegister && (
          <FinishRegistration />
        )
      }
      <button onClick={() => setLogInOpen(false)} type='button' className='absolute z-10 inline-flex items-center justify-center p-2 text-gray-400 rounded-full bg-pennBlue hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-aero md:right-96 md:top-10 right-2 top-2'>
        <span className='sr-only'>Close menu</span>
        <svg className='w-6 h-6 text-aero' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' aria-hidden='true'>
          <path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M6 18L18 6M6 6l12 12' />
        </svg>
      </button>
      <div className='relative h-[90vh] flex flex-col justify-center items-center bg-gray-100 md:px-0 px-5'>
        <div className='relative w-full sm:max-w-sm'>
          <div className='absolute w-full h-full transform shadow-lg card bg-aero rounded-3xl -rotate-6' />
          <div className='absolute w-full h-full transform shadow-lg card bg-pennBlue rounded-3xl rotate-6' />
          <div className='relative w-full px-6 py-4 bg-gray-100 shadow-md rounded-3xl'>
            <label className='block mt-3 text-xl font-semibold text-center text-gray-700'>
              Registro sin contraseña
            </label>
            <form method='#' action='#' className='mt-10'>

              <div className='flex flex-col gap-5 mt-7'>
                <input type='email' ref={emailRef} placeholder='ejemplo@email.com' className='block w-full p-5 mt-1 bg-gray-100 border-none shadow-lg h-11 rounded-xl hover:bg-blue-100 focus:bg-blue-100 focus:ring-0' />

                <button onClick={handleRegister} className='w-full py-3 text-white transition duration-500 ease-in-out transform shadow-xl bg-pennBlue rounded-xl hover:shadow-inner focus:outline-none hover:-translate-x hover:scale-105'>
                  Registrar / Iniciar sesión
                </button>
              </div>

              <div className='flex items-center text-center mt-7'>
                <hr className='w-1/2 border-gray-300 rounded-md border-1' />
                <label className='block w-full text-sm font-medium text-gray-600'>
                  También puedes iniciar sesión con
                </label>
                <hr className='w-1/2 border-gray-300 rounded-md border-1' />
              </div>

              <div className='flex justify-center w-full mt-7'>
                {/* <button onClick={() => handleLoginProvider(facebook)} className='px-4 py-2 mr-5 text-white transition duration-500 ease-in-out transform bg-blue-500 border-none shadow-xl cursor-pointer rounded-xl hover:shadow-inner hover:-translate-x hover:scale-105'>

                  Facebook
                </button> */}
                <button onClick={() => handleLoginProvider(google)} className='px-4 py-2 text-white transition duration-500 ease-in-out transform bg-red-500 border-none shadow-xl cursor-pointer rounded-xl hover:shadow-inner hover:-translate-x hover:scale-105'>

                  Google
                </button>
              </div>
              <div className='flex items-center justify-center text-center mt-7'>
                {errorProvider && <div className='font-bold text-center text-red-500'>Ha ocurrido un error al iniciar sesión</div>}
                {errorRegister && <div className='font-bold text-center text-red-500'>Ha ocurrido un error durante el registro</div>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

  )
}
