import Image from 'next/image'
import Link from 'next/link'
import { deletePublication } from '../../../../firebase/hooks/deleteMethod'
import { DeleteIcon } from '../../../Svg'
import { myLoader } from '../../../myLoader'
import styles from './CardPublications.module.scss'

const CardPublications = ({ publication, user, category, equip, link, promotion, deleteCategory }) => {
  const handleDelete = (category, id) => {
    deletePublication(category, id, user.id, deleteCategory)
  }

  return (
    <div className={styles.CardPublications} data-active={equip} data-promotion={promotion}>
      <Link className={styles.link} target='_blanck' href={equip ? `/publicaciones/teams/${link}/${publication.id}` : `/publicaciones/${link}/${publication.id}`}>
        <Image loader={myLoader} width={0} height={0} src={publication.img.url} alt={user.name} />
        <div className={styles.content}>
          <h2 className={styles.subtitle}>{publication.title.slice(0, 8)}...</h2>
          <p className={styles.description}>{publication.description.slice(0, 10)}...</p>
        </div>
      </Link>
      <button className={styles.delete} onClick={() => handleDelete(category, publication.id)}>
        <DeleteIcon />
      </button>
    </div>
  )
}

export default CardPublications
