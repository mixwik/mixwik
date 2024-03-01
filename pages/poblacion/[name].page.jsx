import Link from 'next/link'
import { useRouter } from 'next/router'
import { useGetUsers } from '../../application/useGetUsers'
import Card from '../../components/Card'
import { CityGamesFilter } from '../../components/Filters/city-games'
import Layout from '../../components/Layout'
import PageLoader from '../../components/Loaders/PageLoader'
import Map from '../../components/Map'
import { BackgroundDots } from '../../components/background-dots'
import { useAllGames } from '../../hooks/useAllGames'
import { useAllTeams } from '../../hooks/useAllTeams'
import { useCityFilterDistance } from '../../hooks/useCityFilterDistance'
import { useLocation } from './hooks/useLocation'

const City = () => {
  const router = useRouter()
  const { name } = router.query
  const { users } = useGetUsers()
  const { allGames } = useAllGames()
  const { allTeams } = useAllTeams()
  const { city } = useLocation(name)

  const listUserAllGames = useCityFilterDistance(city, allGames, 30)
  const listUserTeams = useCityFilterDistance(city, allTeams, 30)
  const listAllGamesAndTeams = [...listUserAllGames, ...listUserTeams]
  if (!city) return <PageLoader />
  return (
    <Layout>
      <div className='relative flex flex-col md:flex-row'>
        <BackgroundDots />
        <section className='md:w-[50vw]'>
          <CityGamesFilter />
          <h1 className='flex justify-center items-center z-10 text-xl font-bold h-[10vh] md:text-3xl'>
            Todos los jugadores en {name}
          </h1>
          <div className='z-10 h-[74vh] md:overflow-y-scroll md:w-[50vw] w-screen overflow-y-auto'>
            <div className='grid grid-cols-[repeat(auto-fit,_minmax(10rem,1fr))] place-items-center gap-y-5'>
              {
              listUserAllGames.length > 0 && (
                listUserAllGames.map(res => (
                  <Card
                    key={res.id}
                    user={users}
                    csgo={res}
                    link={res.category}
                    promotions
                  />
                ))
              )
            }
              {
              listUserTeams.length > 0 && (
                listUserTeams.map((res) => (
                  <Card
                    key={res.id}
                    user={users}
                    csgo={res}
                    link={res.category}
                    equips
                  />
                ))
              )
            }
              {
              listUserAllGames.length > 0 && (
                listUserAllGames.map(res => (
                  <Card
                    key={res.id}
                    user={users}
                    csgo={res}
                    link={res.category}
                    teams
                  />
                ))
              )
            }
              {
              listUserAllGames.length > 0 && (
                listUserAllGames.map(res => (
                  <Card
                    key={res.id}
                    user={users}
                    csgo={res}
                    link={res.category}
                    basic
                  />
                ))
              )
            }
            </div>
            {
              listAllGamesAndTeams.length === 0 && (
                <div className='flex flex-col items-center justify-center w-full h-full gap-5 text-center'>
                  <h2 className='text-2xl font-bold text-gray-400'>No hay jugadores en esta ciudad</h2>
                  <Link className='font-bold text-blue-500' href='/'>
                    Volver a la página principal
                  </Link>
                </div>
              )
            }
          </div>
        </section>
        <Map
          location={city.geometry}
          users={users}
          currentPosition={city.geometry}
          games={listUserAllGames}
          teams={listUserTeams}
          zoom={14}
          size={30}
          category={allGames}
        />
      </div>
    </Layout>
  )
}

export default City
