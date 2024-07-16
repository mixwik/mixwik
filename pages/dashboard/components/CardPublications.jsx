import Image from 'next/image'
import Link from 'next/link'
import { myLoader } from '../../../components/myLoader'
import { COLLECTIONS, PUBLICATION_TYPE } from '../../../domain/constants'
import { deletePublication } from '../../../firebase/hooks/deleteMethod'
import { useMixWikTeamsCheckSubscription } from '../../../hooks/useChecksStripe'
import { removeFavorites } from '../hooks/remove-favorites'

const CardPublications = ({ publication, equip, updateFav, remove, user }) => {
  const category = equip ? COLLECTIONS.teams : publication.category
  const { isMixWikTeams } = useMixWikTeamsCheckSubscription(user?.mixWikTeams)
  const handleClick = () => {
    if (updateFav) {
      removeFavorites(user.uid, publication.id)
        .then(() => {
          setTimeout(() => {
            location.reload()
          }, 500)
        })
    }
    if (remove) {
      if (window.confirm('¿Estas seguro?')) {
        deletePublication(category, publication.id, user.uid, publication.category)
      }
    }
  }
  return (
    <section className='relative flex flex-col justify-between h-40 overflow-hidden bg-gray-100 rounded-md shadow-xl w-80'>
      {
        !isMixWikTeams && (publication.type === PUBLICATION_TYPE.playerWithTeam || publication.type === PUBLICATION_TYPE.team)
          ? (
            <div className='relative flex items-center justify-center h-40'>
              <Image className='object-cover w-full h-full' loader={myLoader} width={0} height={0} src={publication.img.url} alt={publication.title} />
              <h2 className='absolute top-0 left-0 z-10 p-1 font-bold text-white bg-black'>{publication.title.slice(0, 15)}...</h2>
              <p className='absolute z-20 flex items-center justify-center w-full h-full text-xl font-bold text-white bg-black/50'>Inactivo</p>
              <Link className='absolute bottom-0 z-30 w-full p-1 font-bold text-center text-white bg-aero' href={`https://buy.stripe.com/bIY9BEdGg7KA66QdQQ?prefilled_email=${user.email}&client_reference_id=${user.uid}`}>Reactivar</Link>
            </div>
            )
          : (
            <Link className='flex items-center justify-center h-40' href={`/publicaciones/juegos/${publication?.id}?type=${publication?.type}&category=${publication?.category}`}>
              <div className='relative w-full h-full text-white'>
                <Image className='object-cover w-full h-full' loader={myLoader} width={0} height={0} src={publication.img.url} alt={publication.title} />
                <h2 className='absolute top-0 left-0 z-50 p-1 font-bold bg-black'>{publication.title}</h2>
              </div>
            </Link>
            )
      }
      {
      publication.type !== PUBLICATION_TYPE.player &&
        <button onClick={handleClick} className='absolute bottom-0 right-0 w-full h-8 font-semibold text-white bg-pennBlue'>
          {
          remove ? 'Eliminar' : 'Quitar favorito'
        }
        </button>
      }
    </section>
  )
}

export default CardPublications
