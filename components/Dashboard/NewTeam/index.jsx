import { useState } from 'react'
import Csgo from './Csgo'
import styles from './NewTeam.module.scss'

const NewTeam = ({ user, mixWikTeams }) => {
  const [toggle, setToggle] = useState(false)
  return (
    <section className={styles.newTeam}>
      <h1 className={styles.title}>Añadir nuevo team</h1>
      <select className={styles.selectCategory} onChange={(e) => setToggle(e.target.value)}>
        <option value={false}>Selecciona categoría</option>
        <option value='csgo'>Counter Strike Global Ofensive</option>
        <option value=''>Fortnite (Próximamente)</option>
        <option value=''>Valorant (Próximamente)</option>
        <option value=''>Clash Royal (Próximamente)</option>
        <option value=''>League Of Legends (Próximamente)</option>
      </select>
      {toggle === 'csgo' && <Csgo currentUser={user} teams={mixWikTeams} />}
    </section>
  )
}

export default NewTeam
