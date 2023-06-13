// Hooks
import { useState } from 'react'

// Styles
import styles from '../../styles/Pages.module.scss'

// Components
import Card from '../../components/Card'
import Layout from '../../components/Layout'
import Map from '../../components/Map'

// Customs Hooks
import { useGetData } from '../../firebase/hooks/getMethod/useGetData'

// Context
import { useHandleOpenContext } from '../../context'

import Image from 'next/image'
import FilterFortnite from '../../components/Filters/Fortnite'
import { useSession } from '../../firebase/auth/useSession'
import { useGetTeams } from '../../firebase/hooks/getMethod/useGetTeams'
import { useCurrentPosition } from '../../hooks/useCurrentPosition'
import { useUserFortniteFilters } from '../../hooks/useUserFortniteFilters'
import fortniteImage from '../../public/logos/fortnite.png'

const Fortnite = () => {
  const [distance, setDistance] = useState(700)
  const session = useSession()
  const currentPosition = useCurrentPosition()
  const handleOpen = useHandleOpenContext()
  const users = useGetData('users')
  const fortnite = useGetData('fortnite')
  const teams = useGetTeams('teams', 'fortnite')

  // filter current user of the list of users
  const user = users.find(res => res.uid === session.uid)

  // filter users list with different filters
  const listUserFortnite = useUserFortniteFilters(user, fortnite, distance)
  const listUserTeams = useUserFortniteFilters(user, teams, distance)

  return (
    <Layout>
      <div className={styles.pageBox}>
        <section className={styles.pages}>
          <FilterFortnite users={listUserFortnite} distance={distance} setDistance={setDistance} />
          <h1 className={styles.title}>
            <Image src={fortniteImage} alt='Fortnite' />
            Fortnite
          </h1>
          <div className={styles.gamersBox} onClick={() => handleOpen('')}>
            {
              fortnite.length > 0 && (
                fortnite.map((res) => (
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
              listUserFortnite.length > 0 && (
                listUserFortnite.map((res) => (
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
              listUserFortnite.length > 0
                ? (
                    listUserFortnite.map((res) => (
                      <Card
                        key={res.id}
                        user={users} csgo={res}
                        link={res.category}
                        basic
                      />
                    ))
                  )
                : (
                  <div className={styles.gamersNoFound}>No hay jugadores de Fortnite en este momento</div>
                  )
            }
          </div>
        </section>
        <Map
          location={user}
          users={users}
          currentPosition={currentPosition}
          db={listUserFortnite}
          zoom={7}
          size={30}
          category='fortnite'
        />
      </div>
    </Layout>
  )
}

export default Fortnite
