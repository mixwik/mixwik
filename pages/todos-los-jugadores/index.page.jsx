// Hooks
import { useState } from 'react'

// Styles

// Components
import Layout from '../../components/Layout'
import Map from '../../components/Map'

// Customs Hooks
import { useGetData } from '../../firebase/hooks/getMethod/useGetData'
import { useGamesFilters } from '../../hooks/useGamesFilters'

// Context
import { useHandleOpenContext } from '../../context'

import { AllGamesFilter } from '../../components/Filters/all-games'
import { BackgroundDots } from '../../components/background-dots'
import { Cards } from '../../components/cards'
import { COLLECTIONS } from '../../domain/constants'
import { useSession } from '../../firebase/auth/useSession'
import { useGetAllPublications } from '../../hooks/use-get-all-publications'
import { useCurrentPosition } from '../../hooks/useCurrentPosition'

const AllGames = () => {
  const [distance, setDistance] = useState(700)
  const { userProvider } = useSession()
  const { currentPosition } = useCurrentPosition()
  const handleOpen = useHandleOpenContext()
  const users = useGetData(COLLECTIONS.users)
  const { publications } = useGetAllPublications()

  // filter current user of the list of users
  const user = users.find(res => res.uid === userProvider?.uid)

  // filter users list with different filters
  const allPublications = useGamesFilters(user, publications, distance)
  return (
    <Layout>
      <div className='flex flex-col md:flex-row'>
        <BackgroundDots />
        <section className='md:w-[50vw]'>
          <AllGamesFilter distance={distance} setDistance={setDistance} />
          <h1 className='flex items-center justify-center h-10 p-1 text-3xl font-bold md:p-2'>
            Todos los jugadores
          </h1>
          <div
            className='overflow-y-scroll h-[79vh] md:w-[50vw] w-screen md:overflow-y-auto py-5 gap-y-5'
            onClick={() => handleOpen('')}
          >
            <Cards publications={allPublications} users={users} />
          </div>
        </section>
        <Map
          location={user}
          users={users}
          currentPosition={currentPosition}
          games={allPublications}
          teams={allPublications}
          zoom={7}
          size={30}
        />
      </div>
    </Layout>
  )
}

export default AllGames
