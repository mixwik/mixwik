// Hooks
import { useEffect, useState } from 'react'

// Styles
import styles from '../../styles/Pages.module.scss'

// Components
import Card from '../../components/Card'
import FilterCsgo from '../../components/Filters/Csgo'
import Layout from '../../components/Layout'
import Map from '../../components/Map'

// Customs Hooks
import { useGetData } from '../../firebase/hooks/getMethod/useGetData'
import { useUserCsgoFilters } from '../../hooks/useUserCsgoFilters'

// Context
import { useHandleOpenContext } from '../../context'

import { useSession } from '../../firebase/auth/useSession'
import { useGetTeams } from '../../firebase/hooks/getMethod/useGetTeams'
import { useCurrentPosition } from '../../hooks/useCurrentPosition'

const Csgo = () => {
  const [distance, setDistance] = useState(700)
  const [allGames, setAllGames] = useState(700)
  const session = useSession()
  const currentPosition = useCurrentPosition()
  const handleOpen = useHandleOpenContext()
  const users = useGetData('users')
  const csgo = useGetData('csgo')
  const lol = useGetData('lol')
  const teams = useGetTeams('teams', 'csgo')
  useEffect(() => {
    const allGamesArray = [...csgo, ...lol]
    setAllGames(allGamesArray)
  }, [csgo, lol])

  // filter current user of the list of users
  const user = users.find(res => res.uid === session.uid)

  // filter users list with different filters
  const listUserCsgo = useUserCsgoFilters(user, csgo, distance)
  const listUserTeams = useUserCsgoFilters(user, teams, distance)

  return (
    <Layout>
      <div className={styles.pageBox}>
        <section className={styles.pages}>
          <FilterCsgo users={listUserCsgo} distance={distance} setDistance={setDistance} />
          <h1 className={styles.title}>
            Todos los jugadores
          </h1>
          <div className={styles.gamersBox} onClick={() => handleOpen('')}>
            {
              listUserTeams.length > 0 && (
                listUserTeams.map((res) => (
                  <Card
                    key={res.id}
                    user={users}
                    csgo={res}
                    link='csgo'
                    equips
                  />
                ))
              )
            }
            {
              allGames.length > 0 && (
                allGames.map((res) => (
                  <Card
                    key={res.id}
                    user={users}
                    csgo={res}
                    link='csgo'
                    teams
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
          db={listUserCsgo}
          zoom={7}
          size={30}
          category='csgo'
        />
      </div>
    </Layout>
  )
}

export default Csgo
