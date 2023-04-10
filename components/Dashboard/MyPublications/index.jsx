import { useGetMyPublications } from '../../../firebase/hooks/getMethod/useGetMyPublications'
import CardPublications from './CardPublications'
import styles from './MyPublication.module.scss'

const MyPublications = ({ user }) => {
  const publications = useGetMyPublications('csgo', user.uid)
  const publicationsTeams = useGetMyPublications('teams', user.uid)

  if (!publications) return <div>Loading...</div>
  return (
    <section className={styles.myPublications}>
      <h2 className={styles.title}>Mis publicaciones</h2>
      <div className={styles.cardBox}>
        <h3 className={styles.subtitle}>Publicaciones de CSGO</h3>
        {
          publicationsTeams.map((res) => (
            <CardPublications key={res.id} publication={res} user={user} category='teams' equip link='csgo' />
          ))
        }
        {
          publications.map((res) => (
            <CardPublications key={res.id} publication={res} user={user} category='csgo' link='csgo' />
          ))
        }
      </div>
    </section>
  )
}

export default MyPublications
