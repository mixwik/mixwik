import { useRef } from 'react'
// Styles

// LogIn
import { GoogleAuthProvider } from 'firebase/auth'
import { useLogInProvider } from '../../firebase/auth/useLogIn'

// Icons
import Layout from '../../components/Layout'
import { BackgroundDots } from '../../components/background-dots'
import { useRegister } from '../../firebase/auth/register'
import { useConfirmUserRegister } from '../../hooks/useConfirmUserRegister'
import { FinishRegistration } from './components/finish-registration'

const LogIn = () => {
  const emailRef = useRef()
  const { register, successRegister, errorRegister } = useRegister()
  const [errorProvider, logInProvider] = useLogInProvider()
  const google = new GoogleAuthProvider()
  // const twitter = new TwitterAuthProvider()

  const handleLoginProvider = (provider) => {
    logInProvider(provider)
  }
  const handleRegister = (e) => {
    e.preventDefault()
    register(emailRef.current.value)
  }

  useConfirmUserRegister('logIn')
  return (
    <Layout title='Iniciar Sesión'>
      <div>
        {
        successRegister && (
          <FinishRegistration />
        )
        }
        <div className='relative h-[90vh] flex flex-col justify-center items-center md:px-0 px-5'>
          <BackgroundDots />
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

                <div className='flex justify-center w-full gap-5 mt-7'>
                  <button onClick={() => handleLoginProvider(google)} className='px-4 py-2 text-white transition duration-500 ease-in-out transform bg-red-500 border-none shadow-xl cursor-pointer rounded-xl hover:shadow-inner hover:-translate-x hover:scale-105'>
                    Google
                  </button>
                  {/* <button onClick={() => handleLoginProvider(twitter)} className='px-4 py-2 text-white transition duration-500 ease-in-out transform bg-black border-none shadow-xl cursor-pointer rounded-xl hover:shadow-inner hover:-translate-x hover:scale-105'>
                    Twitter
                  </button> */}
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
    </Layout>
  )
}

export default LogIn
