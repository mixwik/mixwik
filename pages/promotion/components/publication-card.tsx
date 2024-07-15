import { gameServer, teamServer } from '../../../domain/types'
import { Card } from './card'

interface PublicationCardProps {
    publications: gameServer[] | teamServer[]
    handlePromotion: (category: string, stripeId: string, publicationId: string) => void
    stripeId: string
    type: string
    title: string
    isMixWikTeams: boolean
    }

export const PublicationCard = ({ publications, handlePromotion, stripeId, isMixWikTeams }: PublicationCardProps) => {
  return (
    <>
      <div className='flex flex-col gap-10'>
        {
          publications?.map(publication => (
            <Card key={publication.id} publication={publication} handlePromotion={handlePromotion} stripeId={stripeId} isMixWikTeams={isMixWikTeams} />
          ))
        }
      </div>
    </>
  )
}
