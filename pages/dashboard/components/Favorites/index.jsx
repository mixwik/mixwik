import { useAllGames } from '../../../../hooks/useAllGames'
import { useAllTeams } from '../../../../hooks/useAllTeams'
import FavCard from './components/FavCard'

const Favorites = ({ currentUser }) => {
  const { allGames } = useAllGames()
  const { allTeams } = useAllTeams()
  const favorites = [...allGames, ...allTeams].filter((res) => currentUser.likes.includes(res.id))

  return (
    <div>
      <div className='bg-aero h-[5vh] font-bold text-xl text-white flex items-center pl-5'>Favoritos</div>
      <section className='bg-white h-[85vh] p-5 grid grid-cols-[repeat(auto-fit,_10rem,_1fr)]'>
        {
          favorites.map((fav) => (
            <FavCard favPublication={fav} key={fav.id} />
          ))
        }
      </section>
    </div>

  )
}

export default Favorites
