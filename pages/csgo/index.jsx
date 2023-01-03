// Hooks
import { useState } from 'react'

// Styles
import styles from '../../styles/Pages.module.scss'

// Components
import Map from '../../components/Map'
import Layout from '../../components/Layout'
import FilterCsgo from '../../components/Filters/Csgo'
import Card from '../../components/Card'

// DB
import db from '../../db/localization.json'

// Customs Hooks
import { useUserCsgoFilters } from '../../hooks/useUserCsgoFilters'

const Csgo = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [distance, setDistance] = useState(700)

  const DB = { ...db }
  const user = DB.venues.find(res => res.name === 'Maruan Vicente')

  const listUserCsgo = useUserCsgoFilters(user, DB.venues, distance)

  return (
    <Layout>
      <section className={styles.pages}>

        {
          isOpen ? <div className={styles.filter}><FilterCsgo isOpen={isOpen} setIsOpen={setIsOpen} users={listUserCsgo} distance={distance} setDistance={setDistance} /></div> : <div className={styles.placeHolder} />
        }
        <section className={styles.gamersBox}>
          <h1 className={styles.title}>Counter Strike Global Ofensive<button onClick={() => setIsOpen(!isOpen)}>Filtros</button></h1>
          {
          listUserCsgo.map((res, index) => (
            <Card key={index} general={res} specific={res.csgo} />
          ))
        }
        </section>
      </section>
      <Map location={user.geometry} db={listUserCsgo} zoom={6} size={30} />
    </Layout>
  )
}

export default Csgo
