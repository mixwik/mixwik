import { useGetMyPublications } from '../../../firebase/hooks/getMethod/useGetMyPublications'
import CardPublications from './CardPublications'
import styles from './MyPublication.module.scss'

const MyPublications = ({ user }) => {
  const publications = useGetMyPublications('csgo', user.uid)

  if (!publications) return <div>Loading...</div>
  console.log(publications)
  return (
    <section className={styles.myPublications}>
      <h2 className={styles.title}>Mis publicaciones</h2>
      <div className={styles.cardBox}>
        <h3 className={styles.subtitle}>Publicaciones de CSGO</h3>
        {
          publications.map((res) => (
            <CardPublications key={res.id} publication={res} user={user} category='csgo' />
          ))
        }
      </div>
    </section>
  )
}

export default MyPublications
