import { useSignOut } from '../../../firebase/auth/SignOut'
import styles from './Profile.module.scss'

const Profile = ({ user }) => {
  const handleSignOut = useSignOut()
  return (
    <section className={styles.profile}>
      <div className={styles.header}>
        <h1 className={styles.title}>Tu perfil</h1>
        <section>
          <h2>Información Pública</h2>
        </section>
        <button
          className={styles.signOut}
          onClick={() => handleSignOut()}
        >
          Cerrar Sesión
        </button>
      </div>
    </section>
  )
}

export default Profile
