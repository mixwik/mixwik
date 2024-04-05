// Styles

// Next Components
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { COLLECTIONS } from '../../domain/constants'
import { UserServer, gameServer, teamServer } from '../../domain/types'
import { useMixWikTeamsCheckSubscription } from '../../hooks/useChecksStripe'
import { useImages } from '../../pages/publicaciones/hooks/use-images'
import { myLoader } from '../myLoader'
import { Badges } from './components/badges'

interface CardProps {
  userServer: UserServer[]
  publication: gameServer | teamServer
  basic?: boolean
  teams?: boolean
  equips?: boolean
  promotions?: boolean
}

const Card = ({ userServer, publication, basic, teams, equips, promotions }: CardProps) => {
  const [loading, setLoading] = useState(true)
  const csgoUser = userServer.find(find => find.uid === publication.uid)
  const mixWikTeams = useMixWikTeamsCheckSubscription(csgoUser?.mixWikTeams)
  const promotion = useMixWikTeamsCheckSubscription(publication.promotion)
  const { images } = useImages({ publication })

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
    <Link href={equips ? `/publicaciones/juegos/${publication.id}?page=${COLLECTIONS.teams}` : `/publicaciones/juegos/${publication.id}?page=${publication.category}`}>
      <section className='relative flex flex-col items-center w-40 overflow-hidden bg-white rounded-md shadow-md h-80'>
        <div className='object-cover size-full'>
          <Carousel
            showStatus={false}
            autoPlay
            infiniteLoop
            showThumbs={false}
          >
            {
              images
                .filter(image => image?.url !== '')
                .map((image, index) => (
                  <Image key={index} loader={myLoader} width={100} height={320} src={image.url} alt={image.name} className='object-cover h-80' />
                ))
                }
          </Carousel>
        </div>

        <h3 className='absolute top-0 w-full p-1 font-bold text-center text-white bg-black/60'>{publication.title.slice(0, 15)}...</h3>
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
