import styles from './User.module.scss'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Layout from '../../../components/Layout'
import { myLoader } from '../../../components/myLoader'
import { useGetOneData } from '../../../firebase/hooks/getMethod/useGetOneData'
import { useGetOnePublication } from '../../../firebase/hooks/getMethod/useGetOnePublication'
import UserMap from '../../../components/UserMap'

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
          <article className={styles.typeOfGamer}>
            <h2>Tipo de jugador</h2>
            <ul>
              {
                currentCsgo.typeOfGamer.map((type, index) => (
                  <li key={index}>{type}</li>
                ))
              }
            </ul>
          </article>
          <article className={styles.level}>
            <h2>Nivel</h2>
            {currentCsgo.level}
          </article>
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
          <article className={styles.hours}>
            <h2>Horas Jugadas</h2>
            {currentCsgo.hours}
          </article>
          <article>
            <UserMap user={currentUser} />
          </article>
        </section>
      </div>
    </Layout>
  )
}

export default User
