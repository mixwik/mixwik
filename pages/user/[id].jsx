import Image from 'next/image'
import { useRouter } from 'next/router'
import Card from '../../components/Card'
import Layout from '../../components/Layout'
import { myLoader } from '../../components/myLoader'
import { useGetMyPublications } from '../../firebase/hooks/getMethod/useGetMyPublications'
import { useGetOneData } from '../../firebase/hooks/getMethod/useGetOneData'
import styles from './User.module.scss'

const User = () => {
  const router = useRouter()
  const { id } = router.query
  const user = useGetOneData('users', id)
  const csgo = useGetMyPublications('csgo', user.uid)
  const teams = useGetMyPublications('teams', user.uid)
  if (user.length === 0) return <div>Loading...</div>
  return (
    <Layout>
      <div className={styles.user}>
        <section className={styles.userData}>
          <div className={styles.imageNameAge}>
            <Image width={0} height={0} loader={myLoader} src={user.profileImg} alt={user.name} />
            <div>
              <h1>{user.name}</h1>
              <p>{user.age} Años</p>
            </div>
          </div>
          <p>{user.description}</p>
          <button className={styles.reportButton}>Reportar Jugador</button>
        </section>
        <section className={styles.publications}>
          <h2>Publicaciones</h2>
          <div className={styles.publicationsBox}>
            {teams.length > 0 && (
              teams.map((res) => (
                <Card key={res.id} csgo={res} user={[user]} link='csgo' equip />
              ))
            )}
            {csgo.length > 0 && (
              csgo.map((res) => (
                <Card key={res.id} csgo={res} user={[user]} link='csgo' />
              ))
            )}
            {csgo.length > 0 && (
              csgo.map((res) => (
                <Card key={res.id} csgo={res} user={[user]} link='csgo' teams />
              ))
            )}
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default User
