// Hooks
import { useState } from 'react'

// Styles
import styles from '../../styles/Pages.module.scss'

// Components
import Map from '../../components/Map'
import Layout from '../../components/Layout'
import FilterCsgo from '../../components/Filters/Csgo'
import Card from '../../components/Card'

// Customs Hooks
import { useUserCsgoFilters } from '../../hooks/useUserCsgoFilters'
import { useGetUsers } from '../../firebase/hooks/getMethod/useGetUsers'

// Context
import { useHandleOpenContext } from '../../context'

import csgoImage from '../../public/logos/csgo.png'
import Image from 'next/image'
import { useCurrentPosition } from '../../hooks/useCurrentPosition'
import { useSession } from '../../firebase/auth/useSession'

const Csgo = () => {
  const [distance, setDistance] = useState(700)
  const session = useSession()
  const currentPosition = useCurrentPosition()
  const handleOpen = useHandleOpenContext()
  const users = useGetUsers('users')
  const csgo = useGetUsers('csgo')

  // filter current user of the list of users
  const user = users.find(res => res.uid === session.uid)

  // filter users list with different filters
  const listUserCsgo = useUserCsgoFilters(user, csgo, distance)

  if (!listUserCsgo) return <div>Loading...</div>
  console.log(listUserCsgo)
  return (
    <Layout>
      <div className={styles.pageBox}>
        <section className={styles.pages}>
          <FilterCsgo users={listUserCsgo} distance={distance} setDistance={setDistance} />
          <h1 className={styles.title}>
            <Image src={csgoImage} alt='Logotipo de Counter Strike Global Ofensive' />
            Counter Strike Global Ofensive
          </h1>
          <div className={styles.gamersBox} onClick={() => handleOpen('')}>
            {
              listUserCsgo.map((res, index) => (
                res
                  ? (
                    <Card key={res.id} user={users} csgo={res} />
                    )
                  : (
                      index === 0 && <div key={res.id}>No hay jugadores de CSGO en este momento</div>
                    )
              ))
            }
          </div>
        </section>
        <Map location={user} currentPosition={currentPosition} db={listUserCsgo} zoom={7} size={30} />
      </div>
    </Layout>
  )
}

export default Csgo
