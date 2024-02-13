// Hooks
import { useEffect, useState } from 'react'

// Styles
import styles from '../../styles/Pages.module.scss'

// Components
import Card from '../../components/Card'
import Layout from '../../components/Layout'
import Map from '../../components/Map'

// Customs Hooks
import { useGetData } from '../../firebase/hooks/getMethod/useGetData'
import { useGamesFilters } from '../../hooks/useGamesFilters'

// Context
import { useHandleOpenContext } from '../../context'

import FilterAllGames from '../../components/Filters/AllGames'
import { COLLECTIONS } from '../../domain/constants'
import { useSession } from '../../firebase/auth/useSession'
import { useGetTeams } from '../../firebase/hooks/getMethod/useGetTeams'
import { useCurrentPosition } from '../../hooks/useCurrentPosition'

const AllGames = () => {
  const [distance, setDistance] = useState(700)
  const [allGames, setAllGames] = useState([])
  const [allTeams, setAllTeams] = useState([])
  const session = useSession()
  const currentPosition = useCurrentPosition()
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
  const user = users.find(res => res.uid === session.uid)

  // filter users list with different filters
  const listUserAllGames = useGamesFilters(user, allGames, distance)
  const listUserTeams = useGamesFilters(user, allTeams, distance)
  return (
    <Layout>
      <div className={styles.pageBox}>
        <section className={styles.pages}>
          <FilterAllGames users={listUserAllGames} distance={distance} setDistance={setDistance} />
          <h1 className={styles.titleAllGames}>
            Todos los jugadores
          </h1>
          <div className={styles.gamersBox} onClick={() => handleOpen('')}>
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
