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
import { useUserFilter } from '../../hooks/useUsersFilterDistance'
import { useFilterContext } from '../../context'

const Csgo = () => {
  const filter = useFilterContext()
  const [isOpen, setIsOpen] = useState(false)
  const [value, setValue] = useState(700)

  const DB = { ...db }
  const user = DB.venues.find(res => res.name === 'Maruan')
  const distance = value

  const listUsers = useUserFilter(user, DB.venues, distance)

  const listUsersAge = listUsers.filter(fil => fil.age >= filter.age.min && fil.age <= filter.age.max)

  const listUsersPosition = filter.position.length
    ? listUsersAge.filter(fil => {
      return filter.position.some((fil2) => {
        return fil.csgo.position.includes(fil2)
      })
    })
    : listUsersAge

  const listUsersTypeOfGamer = filter.typeOfGamer.length
    ? listUsersPosition.filter(fil => fil.csgo.typeOfGamer === filter.typeOfGamer)
    : listUsersPosition

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
        <h1>Counter Strike Global Ofensive</h1>
        <button onClick={() => setIsOpen(!isOpen)}>Filtros</button>
        {
          isOpen ? <div className={styles.filter}><FilterCsgo isOpen={isOpen} setIsOpen={setIsOpen} /></div> : <div className={styles.placeHolder} />
        }
        {
          listUsersTypeOfGamer.map((res, index) => (
            <div className={styles.gamers} key={index}>
              {res.name}
            </div>
          ))
        }
      </section>
      <div className={styles.map}>
        <Map location={user.geometry} db={listUsersTypeOfGamer} zoom={6} size={20} />
      </div>
    </Layout>
  )
}

export default Csgo
