import styles from './MyPublication.module.scss'
import { useGetMyPublications } from '../../../firebase/hooks/getMethod/useGetMyPublications'
import Image from 'next/image'

const MyPublications = ({ user }) => {
  const publications = useGetMyPublications('csgo', user.uid)

  if (!publications) return <div>Loading...</div>
  console.log(publications)
  return (
    <div>
      <div className={styles.gamersBox}>
        {
          publications.map((res) => (
            <div key={res.id}>
              <Image src={res.img} alt={res.name} />
              {res.description}
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default MyPublications
