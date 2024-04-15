import Image from 'next/image'
import { myLoader } from '../../../components/myLoader'
import { gameServer, teamServer } from '../../../domain/types'
import { PUBLICATION_TYPE } from '../../../domain/constants'

interface PublicationCardProps {
    publications: gameServer[] | teamServer[]
    handlePromotion: (category: string, stripeId: string, publicationId: string) => void
    stripeId: string
    type: string
    title: string
    }

export const PublicationCard = ({ publications, handlePromotion, stripeId }: PublicationCardProps) => {
  return (
    <>
      <div className='flex flex-col gap-10'>
        {
          publications?.map(publication => (
            <button key={publication.id} className='relative w-full h-40 overflow-hidden border border-solid rounded-md shadow-lg border-slate-200' onClick={() => handlePromotion(publication.category, stripeId, publication.id)}>
              <Image
                className='object-cover size-full'
                src={publication.img.url}
                alt={publication.img.name}
                loader={myLoader}
                width={0}
                height={0}
              />
              <div className='absolute bottom-0 z-10 flex flex-col justify-between gap-2 p-2 text-white size-full bg-black/50'>
                <h2 className='font-bold'>{publication.title}</h2>
                <p className=''>{publication.description}</p>
                {publication.type === PUBLICATION_TYPE.player && <span className='p-2 font-bold text-white bg-aero'>Jugador</span>}
                {publication.type === PUBLICATION_TYPE.team && <span className='p-2 font-bold text-white bg-orange'>Equipo</span>}
              </div>
            </button>
          ))
        }
      </div>
    </>
  )
}
