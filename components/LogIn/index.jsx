// Styles
import styles from './LogIn.module.scss'

import { GoogleAuthProvider } from 'firebase/auth'
import { logIn } from '../../firebase/auth/useLogIn'
import { useGetUids } from '../../firebase/hooks/useGetUids'
import { GoogleIcon } from '../Svg'

const LogIn = ({ setIsOpen }) => {
  const google = new GoogleAuthProvider()
  const uids = useGetUids()
  const handleLogin = (provider) => {
    logIn(provider)
    console.log(uids)
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
