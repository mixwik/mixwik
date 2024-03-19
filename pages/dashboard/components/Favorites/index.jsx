import { useAllGames } from '../../../../hooks/useAllGames'
import { useAllTeams } from '../../../../hooks/useAllTeams'
import CardPublications from '../CardPublications'
import { WindowLayout } from '../window-layout'

const Favorites = ({ userServer, page }) => {
  const { allGames } = useAllGames()
  const { allTeams } = useAllTeams()
  const favoritesGames = allGames.filter((res) => userServer.likes.includes(res.id))
  const favoritesTeams = allTeams.filter((res) => userServer.likes.includes(res.id))

  const AllFavorites = [...favoritesGames, ...favoritesTeams]

  if (page !== 'favorites') return null
  return (
    <WindowLayout title='Favoritos'>
      <div className='flex flex-wrap justify-between p-10 gap-y-10'>
        {
           favoritesTeams.map((fav) => (
             <CardPublications
               publication={fav}
               updateFav
               user={userServer}
               key={fav.id}
               equip
             />
           ))
          }
        {
            favoritesGames.map((fav) => (
              <CardPublications
                publication={fav}
                user={userServer}
                updateFav
                key={fav.id}
              />
            ))
          }
      </div>
      {
            AllFavorites.length === 0 && (
              <div className='flex flex-col items-center justify-center w-full h-full gap-5 text-center'>
                <h2 className='text-2xl font-bold text-gray-400'>No has añadido ninguna publicación a favoritos</h2>
              </div>
            )
          }
    </WindowLayout>

  )
}

export default Favorites
