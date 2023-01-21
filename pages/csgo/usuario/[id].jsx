import styles from './User.module.scss'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Layout from '../../../components/Layout'
import { useGetOneUser } from '../../../firebase/hooks/useGetOneUser'
import { useGetUsers } from '../../../firebase/hooks/useGetUsers'

const User = () => {
  const router = useRouter()
  const { id } = router.query

  const users = useGetUsers()
  const user = users.find(user => user.id === id)

  const userss = useGetOneUser(id)

  if (!user) return <div>Loading...</div>

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
