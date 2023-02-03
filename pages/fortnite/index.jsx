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
import { useUserFortniteFilters } from '../../hooks/useUserFortniteFilters'

// DB
import Card from '../../components/Card'

// Images
import fortniteImage from '../../public/logos/fortnite.png'
import Image from 'next/image'

const Fortnite = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [distance, setDistance] = useState(700)

  const DB = { ...db }
  const user = DB.venues.find(res => res.name === 'Maruan Vicente')

  const listUsersFiltered = useUserFortniteFilters(user, DB.venues, distance)

  return (
    <Layout>
      <div className={styles.pageBox}>
        <section className={styles.pages}>
          <h1 className={styles.title}>
            <Image src={fortniteImage} alt='Logotipo de Fortnite' />
            Fortnite
          </h1>
          <FilterFortnite isOpen={isOpen} setIsOpen={setIsOpen} users={listUsersFiltered} distance={distance} setDistance={setDistance} />
          <section className={styles.gamersBox}>
            {
          listUsersFiltered.map((res, index) => (
            <Card key={index} general={res} specific={res.fortnite} />
          ))
        }
          </section>
        </section>
        <Map location={user.geometry} db={listUsersFiltered} zoom={7} size={30} />
      </div>
    </Layout>
  )
}

export default Fortnite
