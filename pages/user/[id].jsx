import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Card from '../../components/Card'
import Layout from '../../components/Layout'
import { myLoader } from '../../components/myLoader'
import { useGetMyPublications } from '../../firebase/hooks/getMethod/useGetMyPublications'
import { useGetOneData } from '../../firebase/hooks/getMethod/useGetOneData'
import styles from './User.module.scss'

const User = () => {
  const [isOpen, setIsOpen] = useState(true)
  const router = useRouter()
  const { id } = router.query
  const user = useGetOneData('users', id)
  const csgo = useGetMyPublications('csgo', user.uid)
  const teams = useGetMyPublications('teams', user.uid)
  if (user.length === 0) return <div>Loading...</div>
  return (
    <Layout>
      <div className={styles.user}>
        {
        isOpen
          ? (
            <section className={styles.userData}>
              <div className={styles.imageNameAge}>
                <Image width={0} height={0} loader={myLoader} src={user.profileImg} alt={user.name} />
                <div>
                  <h1>{user.name}</h1>
                  <p>{user.age} Años</p>
                </div>
              </div>
              <p>{user.description}</p>
              <button onClick={() => setIsOpen(!isOpen)} className={styles.reportButton}>
                Reportar Jugador
              </button>
            </section>
            )
          : (
            <section className={styles.reportedUser}>
              <h1>Reportar Jugador</h1>
              <p>¿<span>{user.name}</span> ha cometido una infracción o actos reprobables?</p>
              <p>Envía un email a <Link href='mailto:infomixwik@gmail.com'>infomixwik@gmail.com</Link> aportando las pruebas de su mala conducta y valoraremos la sanción pertinente</p>
              <button onClick={() => setIsOpen(!isOpen)} className={styles.reportButton}>
                Cancelar Reporte
              </button>
            </section>
            )
         }
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
