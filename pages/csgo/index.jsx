// Hooks
import { useState } from 'react'

// Styles
import styles from './Csgo.module.scss'

// Components
import Map from '../../components/Map'
import Layout from '../../components/Layout'
import FilterCsgo from '../../components/Filters/csgo'
import db from '../../db/localization.json'

// Customs Hooks
import { useUserFilter } from '../../hooks/useUsersFilterDistance'

const Csgo = () => {
  const [filter, setFilter] = useState(false)
  const [value, setValue] = useState(10)
  const DB = { ...db }
  const user = DB.venues.find(res => res.name === 'Maruan')
  const distance = value

  const listUsers = useUserFilter(user, DB.venues, distance)

  return (
    <Layout>
      <section className={styles.csgo}>
        <div className={styles.kmSelector}>
          Distancia
          <input
            type='range'
            min={1}
            max={10}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          {value} km
        </div>
        <h1>Counter Strike Global Ofensive</h1>
        <button onClick={() => setFilter(!filter)}>Filtro</button>
        {
          filter ? <div className={styles.filter}><FilterCsgo /></div> : <div className={styles.placeHolder} />
        }
        {
          listUsers.map((res, index) => (
            <div className={styles.gamers} key={index}>
              {res.name}
            </div>
          ))
        }
      </section>
      <div className={styles.map}>
        <Map location={user.geometry} db={listUsers} />
      </div>
    </Layout>
  )
}

export default Csgo
