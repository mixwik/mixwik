// Hooks
import { useState } from 'react'

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

import Image from 'next/image'
import { useSession } from '../../firebase/auth/useSession'
import { useGetTeams } from '../../firebase/hooks/getMethod/useGetTeams'
import { useCurrentPosition } from '../../hooks/useCurrentPosition'
import csgoImage from '../../public/logos/csgo-page.svg'

const Csgo = () => {
  const [distance, setDistance] = useState(700)
  const session = useSession()
  const currentPosition = useCurrentPosition()
  const handleOpen = useHandleOpenContext()
  const users = useGetData('users')
  const csgo = useGetData('csgo')
  const teams = useGetTeams('teams', 'csgo')

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
            <Image src={csgoImage} alt='Logotipo de Counter Strike Global Ofensive' />
            Counter Strike
            Global Ofensive
          </h1>
          <div className={styles.gamersBox} onClick={() => handleOpen('')}>
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
                  <div className={styles.gamersNoFound}>No hay jugadores de CSGO en este momento</div>
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
