// Hooks
import { useState } from 'react'

// Styles
import styles from './Csgo.module.scss'

// Components
import Map from '../../components/Map'
import Layout from '../../components/Layout'
import FilterCsgo from '../../components/Filters/Csgo'
import db from '../../db/localization.json'

// Customs Hooks
import { useUserFilterDistance } from '../../hooks/useUsersFilterDistance'
import { useUserCsgoFilters } from '../../hooks/useUserCsgoFilters'
import Image from 'next/image'

const Csgo = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [value, setValue] = useState(700)

  const DB = { ...db }
  const user = DB.venues.find(res => res.name === 'Maruan Vicente')
  const distance = value

  const listUsers = useUserFilterDistance(user, DB.venues, distance)
  const listUserCsgo = useUserCsgoFilters(listUsers)

  return (
    <Layout>
      <section className={styles.csgo}>
        <div className={styles.kmSelector}>
          Distancia
          <input
            type='range'
            min={1}
            max={700}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          {value} km
        </div>
        <button onClick={() => setIsOpen(!isOpen)}>Filtros</button>
        {
          isOpen ? <div className={styles.filter}><FilterCsgo isOpen={isOpen} setIsOpen={setIsOpen} users={listUserCsgo} /></div> : <div className={styles.placeHolder} />
        }
        <section className={styles.gamersBox}>
          <h1 className={styles.title}>Counter Strike Global Ofensive</h1>
          {
          listUserCsgo.map((res, index) => (
            <section className={styles.gamers} key={index}>
              <Image width={0} height={0} src={res.image} alt={res.name} />
              <h3 className={styles.name}>{res.name}</h3>
            </section>
          ))
        }
        </section>
      </section>
      <div className={styles.map}>
        <Map location={user.geometry} db={listUserCsgo} zoom={6} size={20} />
      </div>
    </Layout>
  )
}

export default Csgo
