// Hooks
import { useState } from 'react'

// Styles
import styles from './Csgo.module.scss'

// Components
import Map from '../../components/Map'
import Layout from '../../components/Layout'
import FilterCsgo from '../../components/Filters/csgo'
import db from '../../db/localization.json'

const Csgo = () => {
  const [filter, setFilter] = useState(false)
  const DB = { ...db }
  const DBFilter = DB.venues.filter(res => res.name === 'Maruan')

  return (
    <Layout>
      <section className={styles.csgo}>
        <h1>Counter Strike Global Ofensive</h1>
        <button onClick={() => setFilter(!filter)}>Filtro</button>
        {
          filter ? <div className={styles.filter}><FilterCsgo /></div> : <div className={styles.placeHolder} />
        }
      </section>
      <div className={styles.map}>
        {
        DBFilter.map((res, index) => (
          <Map key={index} location={res.geometry} db={DB} />
        ))
      }
      </div>
    </Layout>
  )
}

export default Csgo
