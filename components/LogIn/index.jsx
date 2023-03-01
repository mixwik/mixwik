// Styles
import styles from './LogIn.module.scss'

// LogIn
import { GoogleAuthProvider } from 'firebase/auth'
import { useLogIn } from '../../firebase/auth/useLogIn'
import { Formik, Field, Form } from 'formik'

// Icons
import { GoogleIcon } from '../Svg'
import { useRegister } from '../../firebase/auth/register'

const LogIn = ({ setIsOpen, isOpen }) => {
  const register = useRegister()
  const logIn = useLogIn()
  const google = new GoogleAuthProvider()

  const handleLogin = (provider) => {
    logIn(provider)
  }

  return (
    <div data-isOpen={isOpen} className={styles.logInAndRegister}>
      <section className={styles.register}>
        <h2>Regístrate</h2>
        <Formik
          initialValues={
                {
                  email: '',
                  password: ''
                }
              }
          onSubmit={(values, { resetForm }) => {
            register(values.email, values.password)
            resetForm()
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <label>
                Email
                <Field type='email' name='email' />
              </label>
              <label>
                Contraseña
                <Field type='password' name='password' />
              </label>
              <button type='submit' disabled={isSubmitting}>
                Registrar
              </button>
            </Form>
          )}
        </Formik>
      </section>
      <section className={styles.logIn}>
        <div>
          <h2>Iniciar Sesión</h2>
          <span>Para mayor rapidez puedes Iniciar Sesión con tu cuenta de: </span>
        </div>
        <div>
          <button className={styles.logInGoogle} onClick={() => handleLogin(google)}>
            <GoogleIcon />
          </button>
        </div>
      </section>
      <button className={styles.close} onClick={() => setIsOpen(false)}>X</button>
    </div>

  )
}

export default LogIn
