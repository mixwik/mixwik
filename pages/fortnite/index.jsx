// Hooks
import { useState } from 'react'

// Styles
import styles from '../../styles/Pages.module.scss'

// Components
import Map from '../../components/Map'
import Layout from '../../components/Layout'
import FilterFortnite from '../../components/Filters/Fortnite'
import db from '../../db/localization.json'

// Customs Hooks
import { useUserFortniteFilters } from '../../hooks/useUserFortniteFlters'

// DB
import Card from '../../components/Card'

// Image
import fortnite from '../../public/logos/fortnite.png'

const Fortnite = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [distance, setDistance] = useState(700)

  const DB = { ...db }
  const user = DB.venues.find(res => res.name === 'Maruan Vicente')

  const listUsersFiltered = useUserFortniteFilters(user, DB.venues, distance)

  return (
    <Layout>
      <section className={styles.pages}>
        {
          isOpen ? <div className={styles.filter}><FilterFortnite isOpen={isOpen} setIsOpen={setIsOpen} users={listUsersFiltered} distance={distance} setDistance={setDistance} /></div> : <div className={styles.placeHolder} />
        }
        <section className={styles.gamersBox}>
          <h1 className={styles.title}>Fortnite <button onClick={() => setIsOpen(!isOpen)}>Filtros</button></h1>
          {
          listUsersFiltered.map((res, index) => (
            <Card key={index} general={res} specific={res.fortnite} image={fortnite} />
          ))
        }
        </section>
      </section>
      <div className={styles.map}>
        <Map location={user.geometry} db={listUsersFiltered} zoom={6} size={20} />
      </div>
    </Layout>
  )
}

export default Fortnite
