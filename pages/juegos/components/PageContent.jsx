// Hooks

// Styles

// Components
import Map from '../../../components/Map'
import { BackgroundDots } from '../../../components/background-dots.tsx'

// Customs Hooks
import { useGetData } from '../../../firebase/hooks/getMethod/useGetData'
import { useGamesFilters } from '../../../hooks/useGamesFilters'

// Context
import { useHandleOpenContext } from '../../../context'

import { Cards } from '../../../components/cards/index.tsx'
import { COLLECTIONS } from '../../../domain/constants'
import { useSession } from '../../../firebase/auth/useSession'
import { useCurrentPosition } from '../../../hooks/useCurrentPosition'

const PageContent = ({ category, children, distance }) => {
  const { userProvider } = useSession()
  const { currentPosition } = useCurrentPosition()
  const handleOpen = useHandleOpenContext()
  const users = useGetData(COLLECTIONS.users)
  const publications = useGetData(category)

  // filter current user of the list of users
  const user = users.find(res => res.uid === userProvider?.uid)

  // filter users list with different filters
  const publicationsFiltered = useGamesFilters(user, publications, distance)
  return (
    <div className='flex flex-col md:flex-row'>
      <section className='md:w-[50vw]'>
        <BackgroundDots />
        {children}
        <section
          className='overflow-y-scroll h-[80vh] md:h-[73vh] md:w-[50vw] w-screen md:overflow-y-auto p-2 gap-y-5 no-scrollbar'
          onClick={() => handleOpen('')}
        >
          <Cards publications={publicationsFiltered} users={users} isVoid='No hay jugadores en este momento, prueba a modificar los filtros' />
        </section>
      </section>
      <Map
        location={user}
        users={users}
        currentPosition={currentPosition}
        games={publicationsFiltered}
        zoom={7}
        size={30}
      />
    </div>
  )
}

export default PageContent
