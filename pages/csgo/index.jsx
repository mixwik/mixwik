// Hooks
import { useState } from 'react'

// Styles
import styles from '../../styles/Pages.module.scss'

// Components
import Map from '../../components/Map'
import Layout from '../../components/Layout'
import FilterCsgo from '../../components/Filters/Csgo'
import Card from '../../components/Card'

// Data Base
import db from '../../db/localization.json'

// Customs Hooks
import { useUserCsgoFilters } from '../../hooks/useUserCsgoFilters'

// Context
import { useHandleOpenContext } from '../../context'

const Csgo = () => {
  const handleOpen = useHandleOpenContext()
  const [distance, setDistance] = useState(700)

  const DB = { ...db }
  const user = DB.venues.find(res => res.name === 'Maruan Vicente')

  const listUserCsgo = useUserCsgoFilters(user, DB.venues, distance)

  return (
    <Layout>
      <section className={styles.pages}>
        <h1 className={styles.title}>Counter Strike Global Ofensive</h1>
        <FilterCsgo users={listUserCsgo} distance={distance} setDistance={setDistance} />
        <div className={styles.gamersBox} onClick={() => handleOpen('')}>
          {
          listUserCsgo.map((res, index) => (
            <Card key={index} general={res} specific={res.csgo} />
          ))
        }
        </div>
      </section>
      <Map location={user.geometry} db={listUserCsgo} zoom={6} size={30} />
    </Layout>
  )
}

export default Csgo
