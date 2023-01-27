// Styles
import styles from './LogIn.module.scss'

// LogIn
import { GoogleAuthProvider, getAuth } from 'firebase/auth'
import { logIn } from '../../firebase/auth/useLogIn'

// Next Components
import { useRouter } from 'next/router'

// Icons
import { GoogleIcon } from '../Svg'

const LogIn = ({ setIsOpen }) => {
  const google = new GoogleAuthProvider()
  const auth = getAuth()
  const user = auth.currentUser
  const router = useRouter()

  const handleLogin = (provider) => {
    logIn(provider)
  }

  if (user) {
    router.push('/nuevo-usuario')
  }

  return (
    <div className={styles.logIn}>
      <section>
        <h2>Log In</h2>
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
