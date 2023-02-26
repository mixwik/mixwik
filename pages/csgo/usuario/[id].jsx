import styles from './User.module.scss'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Layout from '../../../components/Layout'
import { useGetUsers } from '../../../firebase/hooks/getMethod/useGetUsers'
import { myLoader } from '../../../components/myLoader'
import Link from 'next/link'

const User = () => {
  const router = useRouter()
  const { id } = router.query

  const users = useGetUsers('users')
  const csgo = useGetUsers('csgo')
  const currentCsgo = csgo.find(user => user.id === id)
  const currentUser = users.find(user => user.uid === currentCsgo.uid)

  if (!currentCsgo) return <div>Loading...</div>
  if (!currentUser) return <div>Loading...</div>

  return (
    <Layout>
      <div className={styles.user}>
        <Link href={`/chat/${currentCsgo.uid}`}>Chat</Link>
        <section className={styles.userBox}>
          <Image loader={myLoader} width={0} height={0} src={currentCsgo.img} alt={currentUser.name} />
          <h1 className={styles.title}>
            {currentUser.name}
          </h1>
          <p className={styles.description}>{currentCsgo.description}</p>
          <article className={styles.position}>
            <h2>{currentCsgo.position.length === 1 ? 'Posición' : 'Posiciones'}</h2>
            <ul>
              {
                currentCsgo.position.map((pos, index) => (
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
