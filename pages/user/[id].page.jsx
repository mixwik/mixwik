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
import { useGetTeams } from '../../firebase/hooks/getMethod/useGetTeams'
import { useMixWikTeamsCheckSubscription } from '../../hooks/useChecksStripe'
import styles from './User.module.scss'

const User = () => {
  const [isOpen, setIsOpen] = useState(true)
  const router = useRouter()
  const { id } = router.query
  const user = useGetOneData('users', id)
  const csgo = useGetMyPublications('cs2', user.uid)
  const lol = useGetMyPublications('lol', user.uid)
  const fortnite = useGetMyPublications('fortnite', user.uid)
  const valorant = useGetMyPublications('valorant', user.uid)
  const teamsCsgo = useGetTeams('teams', 'cs2')
  const teamsLol = useGetTeams('teams', 'lol')
  const teamsFortnite = useGetTeams('teams', 'fortnite')
  const teamsValorant = useGetTeams('teams', 'valorant')
  const mixWikTeams = useMixWikTeamsCheckSubscription(user.mixWikTeams)
  if (user.length === 0) return <div>Loading...</div>
  return (
    <Layout>
      <div className={styles.user}>
        <section className={styles.publications}>
          <h2>Publicaciones</h2>
          <article className={styles.publicationsUser}>
            <h3 className={styles.publicationUserTitle}>Counter Strike 2</h3>
            {csgo.length > 0 && (
              csgo.map((res) => (
                <Card key={res.id} csgo={res} user={[user]} link={res.category} promotions />
              ))
            )}
            {teamsCsgo.length > 0 && (
              teamsCsgo.map((res) => (
                <Card key={res.id} csgo={res} user={[user]} link={res.category} equips />
              ))
            )}
            {csgo.length > 0 && (
              csgo.map((res) => (
                <Card key={res.id} csgo={res} user={[user]} link={res.category} teams />
              ))
            )}
            {csgo.length > 0 && (
              csgo.map((res) => (
                <Card key={res.id} csgo={res} user={[user]} link={res.category} basic />
              ))
            )}
          </article>
          <article className={styles.publicationsUser}>
            <h3 className={styles.publicationUserTitle}>League Of Legends</h3>
            {lol.length > 0 && (
              lol.map((res) => (
                <Card key={res.id} csgo={res} user={[user]} link={res.category} promotions />
              ))
            )}
            {teamsLol.length > 0 && (
              teamsLol.map((res) => (
                <Card key={res.id} csgo={res} user={[user]} link={res.category} equips />
              ))
            )}
            {lol.length > 0 && (
              lol.map((res) => (
                <Card key={res.id} csgo={res} user={[user]} link={res.category} teams />
              ))
            )}
            {lol.length > 0 && (
              lol.map((res) => (
                <Card key={res.id} csgo={res} user={[user]} link={res.category} basic />
              ))
            )}
          </article>
          <article className={styles.publicationsUser}>
            <h3 className={styles.publicationUserTitle}>Valorant</h3>
            {valorant.length > 0 && (
              valorant.map((res) => (
                <Card key={res.id} csgo={res} user={[user]} link={res.category} promotions />
              ))
            )}
            {teamsValorant.length > 0 && (
              teamsValorant.map((res) => (
                <Card key={res.id} csgo={res} user={[user]} link={res.category} equips />
              ))
            )}
            {valorant.length > 0 && (
              valorant.map((res) => (
                <Card key={res.id} csgo={res} user={[user]} link={res.category} teams />
              ))
            )}
            {valorant.length > 0 && (
              valorant.map((res) => (
                <Card key={res.id} csgo={res} user={[user]} link={res.category} basic />
              ))
            )}
          </article>
          <article className={styles.publicationsUser}>
            <h3 className={styles.publicationUserTitle}>Fortnite</h3>
            {fortnite.length > 0 && (
              fortnite.map((res) => (
                <Card key={res.id} csgo={res} user={[user]} link={res.category} promotions />
              ))
            )}
            {teamsFortnite.length > 0 && (
              teamsFortnite.map((res) => (
                <Card key={res.id} csgo={res} user={[user]} link={res.category} equips />
              ))
            )}
            {fortnite.length > 0 && (
              fortnite.map((res) => (
                <Card key={res.id} csgo={res} user={[user]} link={res.category} teams />
              ))
            )}
            {fortnite.length > 0 && (
              fortnite.map((res) => (
                <Card key={res.id} csgo={res} user={[user]} link={res.category} basic />
              ))
            )}
          </article>
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
