// Styles
import styles from './FilterCsgo.module.scss'

// Components
import FormAge from '../../Forms/Age'
import TypeOfGamer from '../../Forms/TypeOfGamer'
import FormPosition from '../../Forms/Csgo/Position'
import FormLevel from '../../Forms/Csgo/Level'

const FilterCsgo = ({ isOpen, setIsOpen, users }) => {
  return (
    <section className={styles.filter}>
      <button className={styles.buttonClose} onClick={() => setIsOpen(!isOpen)}>X</button>
      <div className={styles.numberOfUsers}>
        Usuarios encontrados: {users.length}
      </div>
      <form>
        <FormPosition />
        <FormLevel />
        <FormAge />
        <TypeOfGamer />
      </form>
    </section>
  )
}

export default FilterCsgo
