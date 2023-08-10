import { useRouter } from 'next/router'
import { useGetUsers } from '../../application/useGetUsers'
import Card from '../../components/Card'
import FilterCityGames from '../../components/Filters/CityGames'
import Layout from '../../components/Layout'
import Map from '../../components/Map'
import { useAllGames } from '../../hooks/useAllGames'
import { useAllTeams } from '../../hooks/useAllTeams'
import { useCityFilterDistance } from '../../hooks/useCityFilterDistance'
import styles from '../../styles/Pages.module.scss'
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
  if (!city) return <div>Loading...</div>

  return (
    <Layout>
      <div className={styles.pageBox}>
        <section className={styles.pages}>
          <FilterCityGames />
          <h1 className={styles.titleAllGames}>
            Todos los jugadores en {name}
          </h1>
<<<<<<< Updated upstream
          <div className={styles.gamersBox}>
            {
=======
          <div className='z-10 h-[74vh] md:overflow-y-scroll md:w-[50vw] w-screen overflow-y-auto'>
            <div className='grid grid-cols-[repeat(auto-fit,_minmax(10rem,1fr))] place-items-center gap-y-5'>
              {
>>>>>>> Stashed changes
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
