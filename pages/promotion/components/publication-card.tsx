import Image from 'next/image'
import { myLoader } from '../../../components/myLoader'
import { gameServer, teamServer } from '../../../domain/types'

interface PublicationCardProps {
    publication: gameServer | teamServer
    handlePromotion: (category: string, stripeId: string, publicationId: string) => void
    stripeId: string
    category: string
    }

export const PublicationCard = ({ publication, handlePromotion, stripeId, category }: PublicationCardProps) => {
  return (
    <button className='relative w-40 overflow-hidden border border-solid rounded-md shadow-lg h-60 border-slate-200' onClick={() => handlePromotion(category, stripeId, publication.id)}>
      <Image
        className='object-cover size-full'
        src={publication.img.url}
        alt={publication.img.name}
        loader={myLoader}
        width={0}
        height={0}
      />
      <div className='absolute bottom-0 z-10 flex flex-col gap-2 p-2 text-white bg-black/50'>
        <h2 className='font-bold'>{publication.title}</h2>
        <p className=''>{publication.description.slice(0, 30)}...</p>
      </div>
    </button>
  )
}
