// Styles
import styles from './Card.module.scss'

// Next Components
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { useMixWikTeamsCheckSubscription } from '../../hooks/useChecksStripe'
import { CardLoader } from '../Loaders/CardLoader'
import { myLoader } from '../myLoader'

const Card = ({ user, csgo, basic, teams, equips, promotions, link }) => {
  const [loading, setLoadiang] = useState(true)
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
  const promotion = useMixWikTeamsCheckSubscription(csgo.promotion)

  useEffect(() => {
    setTimeout(() => {
      setLoadiang(false)
    }, 2000)
  }, [])

  if (equips && !mixWikTeams) return null
  if (teams && !mixWikTeams) return null
  if (promotions && !promotion) return null
  if (basic && (mixWikTeams || promotion)) return null
  if (loading) return <CardLoader />

  const Head = () => {
    if (mixWikTeams) {
      if (equips) {
        return (
          <div className={styles.equips}>
            Team
          </div>
        )
      } else if (promotions) {
        return (
          <div className={styles.promotion}>
            Promocionada
          </div>
        )
      } else {
        return (
          <div className={styles.teams}>
            Usuario Teams
          </div>
        )
      }
    } else {
      if (promotions) {
        return (
          <div className={styles.promotion}>
            Promocionada
          </div>
        )
      }
    }
  }

  return (
    <Link target='_blanck' href={equips ? `/${link}/team/${csgo.id}` : `/${link}/usuario/${csgo.id}`}>
      <section className={styles.card} data-teams={mixWikTeams} data-promotion={promotion} data-equips={equips}>
        <Head />
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
        <h3 className={styles.title}>{csgo.title.slice(0, 15)}...</h3>
        <div className={styles.description}>
          {csgo.description.slice(0, 20)}...
        </div>
      </section>
    </Link>
  )
}

export default Card
