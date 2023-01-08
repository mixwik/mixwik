import styles from './User.module.scss'
import { useRouter } from 'next/router'
import db from '../../../db/localization.json'
import Image from 'next/image'
import Layout from '../../../components/Layout'

const User = () => {
  const router = useRouter()
  const { id } = router.query
  const DB = { ...db }
  console.log(id)
  const user = DB.venues.find(res => res.id === parseInt(id))
  console.log(user)

  return (
    <Layout>
      <div className={styles.user}>
        <section className={styles.userBox}>
          <h1 className={styles.title}>
            {user.name}
          </h1>
          <Image width={0} height={0} src={user.image} alt={user.name} />
          <p className={styles.description}>{user.csgo.description}</p>
          <article className={styles.position}>
            <h2>{user.csgo.position.length === 1 ? 'Posición' : 'Posiciones'}</h2>
            <ul>
              {
                user.csgo.position.map((pos, index) => (
                  <li key={index}>{pos}</li>
                ))
              }
            </ul>
          </article>
        </section>
      </div>
    </Layout>
  )
}

export default User
