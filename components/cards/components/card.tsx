// Styles

// Next Components
import Image from 'next/image'
import Link from 'next/link'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { UserServer, gameServer, teamServer } from '../../../domain/types'
import { useMixWikTeamsCheckSubscription } from '../../../hooks/useChecksStripe'
import { useImages } from '../../../pages/publicaciones/hooks/use-images'
import { myLoader } from '../../myLoader'
import { Badge } from './badge'

interface CardProps {
  userServer: UserServer[]
  publication: gameServer | teamServer
  promotion?: boolean
}

const Card = ({ userServer, publication, promotion }: CardProps) => {
  const publicationUser = userServer.find(find => find.id === publication?.uid)
  const mixWikTeams = useMixWikTeamsCheckSubscription(publicationUser?.mixWikTeams)
  const { images } = useImages({ publication })
  if (publication?.type === 'team' && !mixWikTeams) return null
  if (publication?.promotion && !promotion) return null

  return (
    <Link href={`/publicaciones/juegos/${publication?.id}?type=${publication?.type}&category=${publication?.category}`}>
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

        <h3 className='absolute top-0 w-full p-1 font-bold text-center text-white bg-black/60'>{publication?.title.slice(0, 15)}...</h3>
        <Badge
          type={publication?.type}
          promotion={promotion}
        />
      </section>
    </Link>
  )
}

export default Card
