// Styles
import styles from './LogIn.module.scss'

// LogIn
import { GoogleAuthProvider } from 'firebase/auth'
import { useLogIn } from '../../firebase/auth/useLogIn'

// Icons
import { GoogleIcon } from '../Svg'

const LogIn = ({ setIsOpen }) => {
  const logIn = useLogIn()
  const google = new GoogleAuthProvider()

  const handleLogin = (provider) => {
    logIn(provider)
  }

  return (
    <div className={styles.logIn}>
      <section>
        <h2>Iniciar Sesión</h2>
        <div>
          <button className={styles.logInGoogle} onClick={() => handleLogin(google)}>
            <GoogleIcon />
          </button>
        </div>
        <button className={styles.close} onClick={() => setIsOpen(false)}>X</button>
      </section>
    </div>
  )
}

export default LogIn
