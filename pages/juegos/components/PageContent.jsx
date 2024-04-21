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
import { useSession } from '../../../firebase/auth/useSession'
import { useCurrentPosition } from '../../../hooks/useCurrentPosition'
import { useGetAllUsers } from '../../../hooks/use-get-all-users.ts'

const PageContent = ({ category, children, distance }) => {
  const { userProvider } = useSession()
  const { currentPosition } = useCurrentPosition()
  const handleOpen = useHandleOpenContext()
  const { users } = useGetAllUsers()
  const publications = useGetData(category)
  const publicationUser = users.find(res => res.uid === userProvider?.uid)
  const publicationsFiltered = useGamesFilters(publicationUser, publications, distance)
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
        publicationUser={publicationUser}
        currentPosition={currentPosition}
        publications={publicationsFiltered}
        zoom={7}
        size={30}
      />
    </div>
  )
}

export default PageContent
