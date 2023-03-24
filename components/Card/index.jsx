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
  csgo.img.url !== '' && images.push({ url: csgo.img.url, name: csgo.img.name })
  csgo.img2.url !== '' && images.push({ url: csgo.img2.url, name: csgo.img2.name })
  csgo.img3.url !== '' && images.push({ url: csgo.img3.url, name: csgo.img3.name })
  csgo.img4.url !== '' && images.push({ url: csgo.img4.url, name: csgo.img4.name })
  csgo.img5.url !== '' && images.push({ url: csgo.img5.url, name: csgo.img5.name })
  csgo.img6.url !== '' && images.push({ url: csgo.img6.url, name: csgo.img6.name })
  csgo.img7.url !== '' && images.push({ url: csgo.img7.url, name: csgo.img7.name })

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
        <div className={styles.imgBox}>
          <Carousel
            showStatus={false}
            autoPlay
            infiniteLoop
            showThumbs={false}
          >
            {

         images.map((res, index) => (
           <Image key={index} loader={myLoader} width={0} height={0} src={res.url} alt={res.name} />

         ))
        }
          </Carousel>
        </div>
        <h3 className={styles.title}>{csgoUser.name}</h3>
        <div className={styles.description}>
          {csgo.description}
        </div>
      </section>
    </Link>
  )
}

export default Card
