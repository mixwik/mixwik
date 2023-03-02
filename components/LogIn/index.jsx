import { useRef } from 'react'
// Styles
import styles from './LogIn.module.scss'

// LogIn
import { GoogleAuthProvider } from 'firebase/auth'
import { useLogInEmail, useLogInProvider } from '../../firebase/auth/useLogIn'

// Icons
import { GoogleIcon } from '../Svg'
import { useRegister } from '../../firebase/auth/register'

const LogIn = ({ setIsOpen, isOpen }) => {
  const emailRef = useRef()
  const passwordRef = useRef()

  const [errorRegister, register] = useRegister()
  const [errorProvider, logInProvider] = useLogInProvider()
  const [errorEmail, logInEmail] = useLogInEmail()
  const google = new GoogleAuthProvider()

  const handleLoginProvider = (provider) => {
    logInProvider(provider)
  }
  const handleRegister = (e) => {
    e.preventDefault()
    register(emailRef.current.value, passwordRef.current.value)
  }
  const handleLogInEmail = (e) => {
    e.preventDefault()
    logInEmail(emailRef.current.value, passwordRef.current.value)
  }

  return (
    <div data-isOpen={isOpen} className={styles.logInAndRegister}>
      <section className={styles.register}>
        <h2>Regístrate</h2>
        <form>
          <label>
            Email
            <input ref={emailRef} type='email' name='email' />
          </label>
          <label>
            Contraseña
            <input ref={passwordRef} type='password' name='password' />
          </label>
          <div>
            <button type='submit' onClick={handleRegister}>
              Registrar
            </button>
            <button type='submit' onClick={handleLogInEmail}>
              Iniciar Sesión
            </button>
          </div>
        </form>
        <div className={styles.error}>
          {
            errorEmail && <span>Ups ha ocurrido un error al iniciar Sesión. Compruebe su Email y/o contraseña.</span>
          }
          {
            errorRegister && <span>Ups ha ocurrido un error al realizar el registro</span>
          }
        </div>
      </section>
      <section className={styles.logIn}>
        <div>
          <h2>Iniciar Sesión</h2>
          <span>Para mayor rapidez puedes Iniciar Sesión con tu cuenta de: </span>
        </div>
        <div>
          <button className={styles.logInGoogle} onClick={() => handleLoginProvider(google)}>
            <GoogleIcon />
          </button>
        </div>
        <div className={styles.error}>
          {
            errorProvider && <span>Ups ha ocurrido un error al iniciar sesión</span>
          }
        </div>
      </section>
      <button className={styles.close} onClick={() => setIsOpen(false)}>X</button>
    </div>

  )
}

export default LogIn
