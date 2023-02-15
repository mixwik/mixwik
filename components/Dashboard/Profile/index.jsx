import styles from './Profile.module.scss'

const Profile = ({ user }) => {
  return (
    <section className={styles.profile}>
      <div className={styles.header}>
        <h1 className={styles.title}>Tu perfil</h1>
        <button className={styles.logOut}>Cerrar Sesión</button>
      </div>
    </section>
  )
}

export default Profile
