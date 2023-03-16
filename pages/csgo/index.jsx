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
import { useCurrentPosition } from '../../hooks/useCurrentPosition'
import csgoImage from '../../public/logos/csgo.png'

const Csgo = () => {
  const [distance, setDistance] = useState(700)
  const session = useSession()
  const currentPosition = useCurrentPosition()
  const handleOpen = useHandleOpenContext()
  const users = useGetData('users')
  const csgo = useGetData('csgo')

  // filter current user of the list of users
  const user = users.find(res => res.uid === session.uid)

  // filter users list with different filters
  const listUserCsgo = useUserCsgoFilters(user, csgo, distance)

  if (!listUserCsgo) return <div>Loading...</div>
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
              listUserCsgo.length > 0 && (
                listUserCsgo.map((res) => (
                  <Card key={res.id} user={users} csgo={res} />
                ))
              )
            }
            {
              listUserCsgo.length > 0
                ? (
                    listUserCsgo.map((res) => (
                      <Card key={res.id} user={users} csgo={res} teams />
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
        />
      </div>
    </Layout>
  )
}

export default Csgo
