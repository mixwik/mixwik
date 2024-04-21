import { useRouter } from 'next/router'
import { CityGamesFilter } from '../../components/Filters/city-games'
import Layout from '../../components/Layout'
import PageLoader from '../../components/Loaders/PageLoader'
import Map from '../../components/Map'
import { BackgroundDots } from '../../components/background-dots'
import { Cards } from '../../components/cards'
import { useGetAllPublications } from '../../hooks/use-get-all-publications'
import { useGetAllUsers } from '../../hooks/use-get-all-users'
import { useCityFilterDistance } from '../../hooks/useCityFilterDistance'
import { useLocation } from './hooks/useLocation'
import { useSession } from '../../firebase/auth/useSession'

const City = () => {
  const router = useRouter()
  const { userProvider } = useSession()
  const { name } = router.query
  const { users } = useGetAllUsers()
  const publicationUser = users.find(res => res.uid === userProvider?.uid)
  const { city } = useLocation(name)
  const { publications } = useGetAllPublications()
  const publicationsFiltered = useCityFilterDistance(city, publications, 30)
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
            <Cards publications={publicationsFiltered} users={users} />
          </div>
        </section>
        <Map
          publicationUser={publicationUser}
          currentPosition={city.geometry}
          publications={publicationsFiltered}
          zoom={14}
        />
      </div>
    </Layout>
  )
}

export default City
