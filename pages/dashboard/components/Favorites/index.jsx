import { PUBLICATION_TYPE } from '../../../../domain/constants'
import CardPublications from '../CardPublications'
import { WindowLayout } from '../window-layout'
import { useGetLikesPublications } from './hooks/use-get-likes-publications'

const Favorites = ({ userServer, page }) => {
  const { publications } = useGetLikesPublications(userServer?.likes)
  if (page !== 'favorites') return null
  return (
    <WindowLayout title='Favoritos'>
      {
      publications?.length > 0
        ? (
          <div className='flex flex-wrap justify-between p-10 gap-y-10'>
            {
           publications?.map(fav => (
             fav.type === PUBLICATION_TYPE.team && (
               <CardPublications
                 publication={fav}
                 updateFav
                 user={userServer}
                 key={fav.id}
               />
             )
           ))
        }
            {
            publications?.map(fav => (
              fav.type === PUBLICATION_TYPE.player && (
                <CardPublications
                  publication={fav}
                  user={userServer}
                  updateFav
                  key={fav.id}
                />
              )
            ))
        }
          </div>
          )
        : (
          <div className='flex flex-col items-center justify-center w-full h-full gap-5 text-center'>
            <h2 className='text-2xl font-bold text-gray-400'>No has añadido ninguna publicación a favoritos</h2>
          </div>
          )
  }
    </WindowLayout>

  )
}

export default Favorites
