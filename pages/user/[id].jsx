import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Card from '../../components/Card'
import Layout from '../../components/Layout'
import SocialLinks from '../../components/SocialLinks'
import { myLoader } from '../../components/myLoader'
import { useGetMyPublications } from '../../firebase/hooks/getMethod/useGetMyPublications'
import { useGetOneData } from '../../firebase/hooks/getMethod/useGetOneData'
import { useMixWikTeamsCheckSubscription } from '../../hooks/useChecksStripe'
import styles from './User.module.scss'

const User = () => {
  const [isOpen, setIsOpen] = useState(true)
  const router = useRouter()
  const { id } = router.query
  const user = useGetOneData('users', id)
  const csgo = useGetMyPublications('csgo', user.uid)
  const teams = useGetMyPublications('teams', user.uid)
  const mixWikTeams = useMixWikTeamsCheckSubscription(user.mixWikTeams)
  if (user.length === 0) return <div>Loading...</div>
  return (
    <Layout>
      <div className={styles.user}>
        <section className={styles.publications}>
          <h2>Publicaciones</h2>
          <div className={styles.publicationsBox}>
            {csgo.length > 0 && (
              csgo.map((res) => (
                <Card key={res.id} csgo={res} user={[user]} link='csgo' promotions />
              ))
            )}
            {teams.length > 0 && (
              teams.map((res) => (
                <Card key={res.id} csgo={res} user={[user]} link='csgo' equips />
              ))
            )}
            {csgo.length > 0 && (
              csgo.map((res) => (
                <Card key={res.id} csgo={res} user={[user]} link='csgo' teams />
              ))
            )}
            {csgo.length > 0 && (
              csgo.map((res) => (
                <Card key={res.id} csgo={res} user={[user]} link='csgo' basic />
              ))
            )}
          </div>
        </section>
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
              <p className={styles.description}>{user.description}</p>
              <section className={styles.social}>
                <h2>Redes Sociales</h2>
                <SocialLinks mixWikTeams={mixWikTeams} user={user} />
              </section>
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
      </div>
    </Layout>
  )
}

export default User
