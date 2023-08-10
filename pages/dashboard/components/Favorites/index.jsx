import { useAllGames } from '../../../../hooks/useAllGames'
import { useAllTeams } from '../../../../hooks/useAllTeams'
import CardPublications from '../CardPublications'

const Favorites = ({ currentUser }) => {
  const { allGames } = useAllGames()
  const { allTeams } = useAllTeams()
  const favoritesGames = allGames.filter((res) => currentUser.likes.includes(res.id))
  const favoritesTeams = allTeams.filter((res) => currentUser.likes.includes(res.id))

  const AllFavorites = [...favoritesGames, ...favoritesTeams]

  return (
    <div>
      <div className='bg-aero h-[5vh] font-bold text-xl text-white flex items-center pl-5'>Favoritos</div>
      <section className='bg-white h-[85vh] p-5'>
        <div className='grid grid-cols-[repeat(auto-fit,_minmax(15rem,1fr))] place-items-center gap-5'>
          {
           favoritesTeams.map((fav) => (
             <CardPublications
               publication={fav}
               updateFav
               user={currentUser}
               key={fav.id}
               equip
             />
           ))
          }
          {
            favoritesGames.map((fav) => (
              <CardPublications
                publication={fav}
                user={currentUser}
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
      </section>
    </div>

  )
}

export default Favorites
