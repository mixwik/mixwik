// Styles

// Next Components
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { COLLECTIONS } from '../../domain/constants'
import { useMixWikTeamsCheckSubscription } from '../../hooks/useChecksStripe'
import { myLoader } from '../myLoader'
import { Badges } from './components/badges'

const Card = ({ user, csgo, basic, teams, equips, promotions }) => {
  const [loading, setLoading] = useState(true)
  const csgoUser = user.find(find => find.uid === csgo.uid)
  const mixWikTeams = useMixWikTeamsCheckSubscription(csgoUser?.mixWikTeams)
  const promotion = useMixWikTeamsCheckSubscription(csgo.promotion)

  const images = []
  csgo.img.url !== '' && images.push({ url: csgo.img.url, name: csgo.img.name })
  csgo.img2.url !== '' && images.push({ url: csgo.img2.url, name: csgo.img2.name })
  csgo.img3.url !== '' && images.push({ url: csgo.img3.url, name: csgo.img3.name })
  csgo.img4.url !== '' && images.push({ url: csgo.img4.url, name: csgo.img4.name })
  csgo.img5.url !== '' && images.push({ url: csgo.img5.url, name: csgo.img5.name })
  csgo.img6.url !== '' && images.push({ url: csgo.img6.url, name: csgo.img6.name })
  csgo.img7.url !== '' && images.push({ url: csgo.img7.url, name: csgo.img7.name })

  setTimeout(() => {
    setLoading(false)
  }, 3000)

  if (basic && (mixWikTeams || promotion)) return null
  if (equips && !mixWikTeams) return null
  if (equips && promotion) return null
  if (teams && !mixWikTeams) return null
  if (teams && promotion) return null
  if (promotions && !promotion) return null
  if (loading) return null

  return (
    <Link href={equips ? `/publicaciones/juegos/${csgo.id}?page=${COLLECTIONS.teams}` : `/publicaciones/juegos/${csgo.id}?page=${csgo.category}`}>
      <section className='relative flex flex-col items-center w-40 overflow-hidden bg-white rounded-md shadow-md h-80'>
        <div className='object-cover size-full'>
          <Carousel
            showStatus={false}
            autoPlay
            infiniteLoop
            showThumbs={false}
          >
            {

         images.map((res, index) => (
           <Image key={index} loader={myLoader} width={0} height={0} src={res.url} alt={res.name} className='object-cover h-80' />

         ))
        }
          </Carousel>
        </div>

        <h3 className='absolute top-0 w-full p-1 font-bold text-center text-white bg-black/60'>{csgo.title.slice(0, 15)}...</h3>
        <Badges
          equips={equips}
          mixWikTeams={mixWikTeams}
          promotions={promotions}
        />
      </section>
    </Link>
  )
}

export default Card
