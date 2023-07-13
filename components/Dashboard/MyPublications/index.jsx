import { useGetMyPublications } from '../../../firebase/hooks/getMethod/useGetMyPublications'
import { useGetTeams } from '../../../firebase/hooks/getMethod/useGetTeams'
import CardPublications from './CardPublications'
import styles from './MyPublication.module.scss'

const MyPublications = ({ user }) => {
  const publicationsCSGO = useGetMyPublications('csgo', user.uid)
  const publicationsLOL = useGetMyPublications('lol', user.uid)
  const publicationsFortnite = useGetMyPublications('fortnite', user.uid)
  const publicationsCsgoTeams = useGetTeams('teams', 'csgo')
  const publicationsLolTeams = useGetTeams('teams', 'lol')
  const publicationsFortniteTeams = useGetTeams('teams', 'fortnite')

  if (!publicationsCSGO) return <div>Loading...</div>
  return (
    <section className={styles.myPublications}>
      <h2 className={styles.title}>Mis publicaciones</h2>
      <div className={styles.cardBox}>
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
      </div>
      <div className={styles.cardBox}>
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
      </div>
      <div className={styles.cardBox}>
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
      </div>
    </section>
  )
}

export default MyPublications
