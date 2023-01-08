// Styles
import styles from './Card.module.scss'

// Next Components
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Card = ({ general, specific }) => {
  const router = useRouter()
  return (
    <Link href={`${router.asPath}/usuario/${general.id}`}>
      <section className={styles.card}>
        <Image width={0} height={0} src={general.image} alt={general.name} />
        <h3 className={styles.title}>{general.name}</h3>
        <div className={styles.description}>
          {specific.description}
        </div>
        <div className={styles.typeOfGamer}>{specific.typeOfGamer}</div>
      </section>
    </Link>
  )
}

export default Card
