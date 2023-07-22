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
import { useUserCsgoFilters } from '../../hooks/useUserCsgoFilters'

// Context
import { useHandleOpenContext } from '../../context'

import Image from 'next/image'
import FilterValorant from '../../components/Filters/Valorant'
import { useSession } from '../../firebase/auth/useSession'
import { useGetTeams } from '../../firebase/hooks/getMethod/useGetTeams'
import { useCurrentPosition } from '../../hooks/useCurrentPosition'
import valorantImage from '../../public/logos/VALORANT.png'

const Valorant = () => {
  const [distance, setDistance] = useState(700)
  const session = useSession()
  const currentPosition = useCurrentPosition()
  const handleOpen = useHandleOpenContext()
  const users = useGetData('users')
  const valorant = useGetData('valorant')
  const teams = useGetTeams('teams', 'valorant')

  // filter current user of the list of users
  const user = users.find(res => res.uid === session.uid)

  // filter users list with different filters
  const listUserValorant = useUserCsgoFilters(user, valorant, distance)
  const listUserTeams = useUserCsgoFilters(user, teams, distance)

  return (
    <Layout>
      <div className={styles.pageBox}>
        <section className={styles.pages}>
          <FilterValorant users={listUserValorant} distance={distance} setDistance={setDistance} />
          <h1 className={styles.title}>
            <Image src={valorantImage} alt='Logotipo de Counter Strike Global Ofensive' />
            Valorant
          </h1>
          <div className={styles.gamersBox} onClick={() => handleOpen('')}>
            {
              valorant.length > 0 && (
                valorant.map((res) => (
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
              listUserValorant.length > 0 && (
                listUserValorant.map((res) => (
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
              listUserValorant.length > 0
                ? (
                    listUserValorant.map((res) => (
                      <Card
                        key={res.id}
                        user={users} csgo={res}
                        link={res.category}
                        basic
                      />
                    ))
                  )
                : (
                  <div className={styles.gamersNoFound}>No hay jugadores de Valorant en este momento</div>
                  )
            }
          </div>
        </section>
        <Map
          location={user}
          users={users}
          currentPosition={currentPosition}
          games={listUserValorant}
          teams={listUserTeams}
          zoom={7}
          size={30}
          category='valorant'
        />
      </div>
    </Layout>
  )
}

export default Valorant
