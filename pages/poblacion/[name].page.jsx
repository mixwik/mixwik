import { useRouter } from 'next/router'
import { useGetUsers } from '../../application/useGetUsers'
import { CityGamesFilter } from '../../components/Filters/city-games'
import Layout from '../../components/Layout'
import PageLoader from '../../components/Loaders/PageLoader'
import Map from '../../components/Map'
import { BackgroundDots } from '../../components/background-dots'
import { Cards } from '../../components/cards'
import { useGetAllPublications } from '../../hooks/use-get-all-publications'
import { useCityFilterDistance } from '../../hooks/useCityFilterDistance'
import { useLocation } from './hooks/useLocation'

const City = () => {
  const router = useRouter()
  const { name } = router.query
  const { users } = useGetUsers()
  const { city } = useLocation(name)
  const { publications } = useGetAllPublications()
  const allPublications = useCityFilterDistance(city, publications, 30)
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
          <div className='z-10 h-[74vh] md:overflow-y-scroll md:w-[50vw] w-screen overflow-y-auto no-scrollbar'>
            <Cards publications={allPublications} users={users} />
          </div>
        </section>
        <Map
          location={city.geometry}
          users={users}
          currentPosition={city.geometry}
          games={allPublications}
          zoom={14}
          size={30}
          category={allPublications}
        />
      </div>
    </Layout>
  )
}

export default City
