import Image from 'next/image'
import { myLoader } from '../../../myLoader'
import styles from './CardPublications.module.scss'

const CardPublications = ({ imageUrl, title, description }) => {
  return (
    <div className={styles.CardPublications}>
      <Image loader={myLoader} width={0} height={0} src={imageUrl} alt={title} />
      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
        <div className={styles.buttons}>
          <button>
            Editar
          </button>
          <button>
            Eliminar
          </button>
        </div>
      </div>
    </div>
  )
}

export default CardPublications
