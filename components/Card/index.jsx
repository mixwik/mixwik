// Styles
import styles from './Card.module.scss'

// Next Components
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { useMixWikTeamsCheckSubscription } from '../../hooks/useChecksStripe'
import { myLoader } from '../myLoader'

const Card = ({ user, csgo, teams }) => {
  const router = useRouter()
  const csgoUser = user.find(find => find.uid === csgo.uid)
  const images = []
  csgo.img && images.push(csgo.img)
  csgo.img2 && images.push(csgo.img2)
  csgo.img3 && images.push(csgo.img3)
  csgo.img4 && images.push(csgo.img4)
  csgo.img5 && images.push(csgo.img5)
  csgo.img6 && images.push(csgo.img6)
  const mixWikTeams = useMixWikTeamsCheckSubscription(csgoUser.mixWikTeams)
  if (teams && mixWikTeams) return null
  if (!teams && !mixWikTeams) return null

  return (
    <Link target='_blanck' href={`${router.asPath}/usuario/${csgo.id}`}>
      <section className={styles.card} data-teams={mixWikTeams}>
        {
        mixWikTeams && (
          <div className={styles.teams}>
            Mixwik Teams
          </div>
        )
      }

        <Carousel
          showStatus={false}
          autoPlay
          infiniteLoop
          showThumbs={false}
        >
          {

         images.map((res, index) => (
           <Image key={index} loader={myLoader} width={0} height={0} src={res} alt={csgo.name} />

         ))
        }
        </Carousel>
        <h3 className={styles.title}>{csgoUser.name}</h3>
        <div className={styles.description}>
          {csgo.description}
        </div>
      </section>
    </Link>
  )
}

export default Card
