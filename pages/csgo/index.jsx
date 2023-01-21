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
import { useGetUsers } from '../../firebase/hooks/useGetUsers'

// Context
import { useHandleOpenContext } from '../../context'

import csgoImage from '../../public/logos/csgo.png'
import Image from 'next/image'

const Csgo = () => {
  const handleOpen = useHandleOpenContext()
  const [distance, setDistance] = useState(700)

  const users = useGetUsers()

  console.log(users)
  const user = users.find(res => res.name === 'Maruan Vicente')

  const listUserCsgo = useUserCsgoFilters(user, users, distance)

  if (!user) return <div>Loading...</div>

  return (
    <Layout>
      <section className={styles.pages}>
        <h1 className={styles.title}>
          <Image src={csgoImage} alt='Logotipo de Counter Strike Global Ofensive' />
          Counter Strike Global Ofensive
        </h1>
        <FilterCsgo users={listUserCsgo} distance={distance} setDistance={setDistance} />
        <div className={styles.gamersBox} onClick={() => handleOpen('')}>
          {
          listUserCsgo.map((res, index) => (
            <Card key={index} general={res} specific={res.csgo} />
          ))
        }
        </div>
      </section>
      <Map location={user.geometry} db={listUserCsgo} zoom={7} size={30} />
    </Layout>
  )
}

export default Csgo
