import { useGetMyPublications } from '../../../firebase/hooks/getMethod/useGetMyPublications'
import { useGetTeams } from '../../../firebase/hooks/getMethod/useGetTeams'
import CardPublications from './CardPublications'
import styles from './MyPublication.module.scss'

const MyPublications = ({ user }) => {
  const publicationsCSGO = useGetMyPublications('csgo', user.uid)
  const publicationsLOL = useGetMyPublications('lol', user.uid)
  const publicationsFortnite = useGetMyPublications('fortnite', user.uid)
  const publicationsValorant = useGetMyPublications('valorant', user.uid)
  const publicationsCsgoTeams = useGetTeams('teams', 'csgo')
  const publicationsLolTeams = useGetTeams('teams', 'lol')
  const publicationsFortniteTeams = useGetTeams('teams', 'fortnite')
  const publicationsValorantTeams = useGetTeams('teams', 'valorant')

  if (!publicationsCSGO) return <div>Loading...</div>
  return (
    <section className={styles.myPublications}>
      <h2 className={styles.title}>Mis publicaciones</h2>
      <article className={styles.cardBox}>
        <h3 className={styles.subtitle}>Publicaciones de CSGO</h3>
        {
          publicationsCsgoTeams.map((res) => (
            <CardPublications key={res.id} publication={res} user={user} category='teams' equip link='cs2' />
          ))
        }
        {
          publicationsCSGO.map((res) => (
            <CardPublications key={res.id} publication={res} user={user} category='cs2' link='cs2' />
          ))
        }
      </article>
      <article className={styles.cardBox}>
        <h3 className={styles.subtitle}>Publicaciones de Lol</h3>
        {
          publicationsLolTeams.map((res) => (
            <CardPublications key={res.id} publication={res} user={user} category='teams' equip link='lol' />
          ))
        }
        {
          publicationsLOL.map((res) => (
            <CardPublications key={res.id} publication={res} user={user} category='lol' link='lol' />
          ))
        }
      </article>
      <article className={styles.cardBox}>
        <h3 className={styles.subtitle}>Publicaciones de Fortnite</h3>
        {
          publicationsFortniteTeams.map((res) => (
            <CardPublications key={res.id} publication={res} user={user} category='teams' equip link='fortnite' />
          ))
        }
        {
          publicationsFortnite.map((res) => (
            <CardPublications key={res.id} publication={res} user={user} category='fortnite' link='fortnite' />
          ))
        }
      </article>
      <article className={styles.cardBox}>
        <h3 className={styles.subtitle}>Publicaciones de Valorant</h3>
        {
          publicationsValorantTeams.map((res) => (
            <CardPublications key={res.id} publication={res} user={user} category='teams' teamsCategory='valorant' equip link='valorant' />
          ))
        }
        {
          publicationsValorant.map((res) => (
            <CardPublications key={res.id} publication={res} user={user} category='valorant' link='valorant' />
          ))
        }
      </article>
    </section>
  )
}

export default MyPublications
