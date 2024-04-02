// Hooks

// Styles

// Components
import Card from '../../../components/Card'
import Map from '../../../components/Map'
import { BackgroundDots } from '../../../components/background-dots.tsx'
import { Spinner } from '../../../icons/spinner.tsx'

// Customs Hooks
import { useGetData } from '../../../firebase/hooks/getMethod/useGetData'
import { useGamesFilters } from '../../../hooks/useGamesFilters'

// Context
import { useHandleOpenContext } from '../../../context'

import Link from 'next/link'
import { useState } from 'react'
import { COLLECTIONS } from '../../../domain/constants'
import { useSession } from '../../../firebase/auth/useSession'
import { useGetTeams } from '../../../firebase/hooks/getMethod/useGetTeams'
import { useCurrentPosition } from '../../../hooks/useCurrentPosition'

const PageContent = ({ category, children, distance }) => {
  const [loading, setLoading] = useState(true)
  setTimeout(() => {
    setLoading(false)
  }, 3000)
  const { userProvider } = useSession()
  const { currentPosition } = useCurrentPosition()
  const handleOpen = useHandleOpenContext()
  const users = useGetData(COLLECTIONS.users)
  const csgo = useGetData(category)
  const teams = useGetTeams(COLLECTIONS.teams, category)

  // filter current user of the list of users
  const user = users.find(res => res.uid === userProvider?.uid)

  // filter users list with different filters
  const listUserCsgo = useGamesFilters(user, csgo, distance)
  const listUserTeams = useGamesFilters(user, teams, distance)
  return (
    <div className='flex flex-col md:flex-row'>
      <section className='md:w-[50vw]'>
        <BackgroundDots />
        {children}
        <section
          className='flex justify-between flex-wrap overflow-y-scroll h-[80vh] md:h-[74vh] md:w-[50vw] w-screen md:overflow-y-auto p-2 gap-y-5'
          onClick={() => handleOpen('')}
        >
          {loading &&
            <div className='flex items-center justify-center size-full'>
              <BackgroundDots />
              <span className='flex flex-col items-center justify-center gap-5 text-xl font-bold text-gray-500'>
                <Spinner />
                Cargando jugadores y equipos...
              </span>
            </div>}
          {
              csgo.length > 0 && (
                csgo.map((res) => (
                  res.promotion && (
                    <Card
                      key={res.id}
                      user={users}
                      csgo={res}
                      link={res.category}
                      promotions
                    />
                  )
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
              listUserCsgo.length > 0 && (
                listUserCsgo.map((res) => (
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
              listUserCsgo.length > 0
                ? (
                    listUserCsgo.map((res) => (
                      <Card
                        key={res.id}
                        user={users} csgo={res}
                        link={res.category}
                        basic
                      />
                    ))
                  )
                : (
                  <div className='flex flex-col items-center justify-center w-full h-full gap-5 text-center'>
                    <h2 className='text-2xl font-bold text-gray-400'>No hay jugadores en este momento, modifica los filtros</h2>
                    <Link className='font-bold text-blue-500' href='/'>
                      Volver a la página principal
                    </Link>
                  </div>
                  )
            }
        </section>
      </section>
      <Map
        location={user}
        users={users}
        currentPosition={currentPosition}
        games={listUserCsgo}
        teams={listUserTeams}
        zoom={7}
        size={30}
      />
    </div>
  )
}

export default PageContent
