import styles from './User.module.scss'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Layout from '../../../components/Layout'
import { myLoader } from '../../../components/myLoader'
import { useGetOneData } from '../../../firebase/hooks/getMethod/useGetOneData'
import { useGetOnePublication } from '../../../firebase/hooks/getMethod/useGetOnePublication'

const User = () => {
  const router = useRouter()
  const { id } = router.query

  const currentCsgo = useGetOnePublication('csgo', id)
  console.log(currentCsgo)
  const currentUser = useGetOneData('users', currentCsgo.uid)
  console.log(currentUser)

  if (currentCsgo.length === 0) return <div>Loading...</div>
  if (currentUser.length === 0) return <div>Loading...</div>

  return (
    <Layout>
      <div className={styles.user}>
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
