// Styles
import styles from '../Filters.module.scss'

// Components
import FormAge from '../../Forms/Age'
import TypeOfGamer from '../../Forms/TypeOfGamer'
import FormPosition from '../../Forms/Fortnite/Positon'
import FormPreferenceTeam from '../../Forms/Fortnite/PreferenceTeam'
import Distance from '../../Forms/Distance'

const FilterFortnite = ({ isOpen, setIsOpen, users, distance, setDistance }) => {
  return (
    <section className={styles.filter}>
      <button className={styles.buttonClose} onClick={() => setIsOpen(!isOpen)}>X</button>
      <div className={styles.numberOfUsers}>
        Usuarios encontrados: {users.length}
      </div>
      <form>
        <Distance distance={distance} setDistance={setDistance} />
        <FormPosition />
        <FormPreferenceTeam />
        <FormAge />
        <TypeOfGamer />
      </form>
    </section>
  )
}

export default FilterFortnite
