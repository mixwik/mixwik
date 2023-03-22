import Image from 'next/image'
import Link from 'next/link'
import { myLoader } from '../../../myLoader'
import styles from './CardPublications.module.scss'

const CardPublications = ({ publication, user, category }) => {
  return (
    <div className={styles.CardPublications}>
      <Link className={styles.link} target='_blanck' href={`/${category}/usuario/${publication.id}`}>
        <Image loader={myLoader} width={0} height={0} src={publication.img.url} alt={user.name} />
        <div className={styles.content}>
          <h2 className={styles.title}>{user.name}</h2>
          <p className={styles.description}>{publication.description.slice(0, 15)}...</p>
          <div className={styles.buttons} />
        </div>
      </Link>
      <button>
        Eliminar
      </button>
    </div>
  )
}

export default CardPublications
