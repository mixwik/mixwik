// Styles
import styles from './Card.module.scss'

// Next Components
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { myLoader } from '../myLoader'

const Card = ({ user, csgo }) => {
  const router = useRouter()
  const csgoUser = user.find(find => find.uid === csgo.uid)

  return (
    <Link href={`${router.asPath}/usuario/${csgo.id}`}>
      <section className={styles.card}>
        <Image loader={myLoader} width={0} height={0} src={csgo.image} alt={csgoUser.name} />
        <h3 className={styles.title}>{csgoUser.name}</h3>
        <div className={styles.description}>
          {csgo.description}
        </div>
        <div className={styles.typeOfGamer}>{csgo.typeOfGamer}</div>
      </section>
    </Link>
  )
}

export default Card
