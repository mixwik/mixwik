// Hooks
import { useEffect, useState } from 'react'

// Styles

// Components
import Card from '../../components/Card'
import Layout from '../../components/Layout'
import Map from '../../components/Map'

// Customs Hooks
import { useGetData } from '../../firebase/hooks/getMethod/useGetData'
import { useGamesFilters } from '../../hooks/useGamesFilters'

// Context
import { useHandleOpenContext } from '../../context'

import { AllGamesFilter } from '../../components/Filters/all-games'
import { BackgroundDots } from '../../components/background-dots'
import { COLLECTIONS } from '../../domain/constants'
import { useSession } from '../../firebase/auth/useSession'
import { useGetTeams } from '../../firebase/hooks/getMethod/useGetTeams'
import { useCurrentPosition } from '../../hooks/useCurrentPosition'

const AllGames = () => {
  const [distance, setDistance] = useState(700)
  const [allGames, setAllGames] = useState([])
  const [allTeams, setAllTeams] = useState([])
  const { userProvider } = useSession()
  const { currentPosition } = useCurrentPosition()
  const handleOpen = useHandleOpenContext()
  const users = useGetData(COLLECTIONS.users)
  const csgo = useGetData(COLLECTIONS.cs2)
  const lol = useGetData(COLLECTIONS.lol)
  const valorant = useGetData(COLLECTIONS.valorant)
  const fortnite = useGetData(COLLECTIONS.fortnite)
  const teamsCsgo = useGetTeams(COLLECTIONS.teams, COLLECTIONS.cs2)
  const teamsLol = useGetTeams(COLLECTIONS.teams, COLLECTIONS.lol)
  const teamsFortnite = useGetTeams(COLLECTIONS.teams, COLLECTIONS.fortnite)
  const teamsValorant = useGetTeams(COLLECTIONS.teams, COLLECTIONS.valorant)
  useEffect(() => {
    const allGamesArray = [...csgo, ...lol, ...fortnite, ...valorant]
    const allTeamsArray = [...teamsCsgo, ...teamsLol, ...teamsFortnite, ...teamsValorant]
    setAllGames(allGamesArray)
    setAllTeams(allTeamsArray)
  }, [csgo, lol, fortnite, valorant, teamsCsgo, teamsLol, teamsFortnite, teamsValorant])

  // filter current user of the list of users
  const user = users.find(res => res.uid === userProvider?.uid)

  // filter users list with different filters
  const listUserAllGames = useGamesFilters(user, allGames, distance)
  const listUserTeams = useGamesFilters(user, allTeams, distance)
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
            className='grid grid-cols-[repeat(auto-fit,_minmax(10rem,1fr))] place-items-center overflow-y-scroll h-[79vh] md:w-[50vw] w-screen md:overflow-y-auto py-5 gap-y-5'
            onClick={() => handleOpen('')}
          >
            {
              listUserAllGames.length > 0 && (
                listUserAllGames.map(res => (
                  <Card
                    key={res.id}
                    userServer={users}
                    publication={res}
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
                    userServer={users}
                    publication={res}
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
                    userServer={users}
                    publication={res}
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
                    userServer={users}
                    publication={res}
                    link={res.category}
                    basic
                  />
                ))
              )
            }
          </div>
        </section>
        <Map
          location={user}
          users={users}
          currentPosition={currentPosition}
          games={listUserAllGames}
          teams={listUserTeams}
          zoom={7}
          size={30}
        />
      </div>
    </Layout>
  )
}

export default AllGames
