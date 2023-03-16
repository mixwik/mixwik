import { useGetMyPublications } from '../../../firebase/hooks/getMethod/useGetMyPublications'
import CardPublications from './CardPublications'
import styles from './MyPublication.module.scss'

const MyPublications = ({ user }) => {
  const publications = useGetMyPublications('csgo', user.uid)

  if (!publications) return <div>Loading...</div>
  console.log(publications)
  return (
    <section className={styles.myPublications}>
      <div className={styles.gamersBox}>
        {
          publications.map((res) => (
            <CardPublications key={res.id} imageUrl={res.img.url} title={user.name} description={res.description} />
          ))
        }
      </div>
    </section>
  )
}

export default MyPublications
