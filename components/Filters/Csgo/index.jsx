// Styles
import styles from '../Filters.module.scss'

// Components
import FormAge from '../../Forms/Age'
import TypeOfGamer from '../../Forms/TypeOfGamer'
import FormPosition from '../../Forms/Csgo/Position'
import FormLevel from '../../Forms/Csgo/Level'
import Distance from '../../Forms/Distance'

const FilterCsgo = ({ isOpen, setIsOpen, users, distance, setDistance }) => {
  return (
    <section className={styles.filter}>
      <button className={styles.buttonClose} onClick={() => setIsOpen(!isOpen)}>X</button>
      <div className={styles.numberOfUsers}>
        Usuarios encontrados: {users.length}
      </div>
      <form>
        <Distance distance={distance} setDistance={setDistance} />
        <FormPosition />
        <FormLevel />
        <FormAge />
        <TypeOfGamer />
      </form>
    </section>
  )
}

export default FilterCsgo
