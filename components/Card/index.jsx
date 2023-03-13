// Styles
import styles from './Card.module.scss'

// Next Components
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { myLoader } from '../myLoader'
import { useMixWikTeamsCheckSubscription } from '../../hooks/useChecksStripe'

const Card = ({ user, csgo }) => {
  const router = useRouter()
  const csgoUser = user.find(find => find.uid === csgo.uid)

  const mixWikTeams = useMixWikTeamsCheckSubscription(csgoUser.mixWikTeams)

  return (
    <Link href={`${router.asPath}/usuario/${csgo.id}`}>
      <section className={styles.card} data-teams={mixWikTeams}>
        <Image loader={myLoader} width={0} height={0} src={csgo.img} alt={csgoUser.name} />
        <h3 className={styles.title}>{csgoUser.name}</h3>
        <div className={styles.description}>
          {csgo.description}
        </div>
      </section>
    </Link>
  )
}

export default Card
