import Image from 'next/image'
import Link from 'next/link'
import { deletePublication } from '../../../../firebase/hooks/deleteMethod'
import { updateUserNumberPublications } from '../../../../firebase/hooks/updateMethod/updateUserData'
import { myLoader } from '../../../myLoader'
import styles from './CardPublications.module.scss'

const CardPublications = ({ publication, user, category }) => {
  const handleDelete = (category, id) => {
    deletePublication(category, id)
    updateUserNumberPublications(user.id, -1)
  }
  return (
    <div className={styles.CardPublications}>
      <Link className={styles.link} target='_blanck' href={`/${category}/usuario/${publication.id}`}>
        <Image loader={myLoader} width={0} height={0} src={publication.img.url} alt={user.name} />
        <div className={styles.content}>
          <h2 className={styles.title}>{user.name}</h2>
          <p className={styles.description}>{publication.description.slice(0, 15)}...</p>
        </div>
      </Link>
      <button onClick={() => handleDelete(category, publication.id)}>
        Eliminar
      </button>
    </div>
  )
}

export default CardPublications
