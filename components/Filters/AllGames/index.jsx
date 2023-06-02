// Styles
import styles from '../Filters.module.scss'

// Components
import FormAge from '../../Forms/Age'
import Distance from '../../Forms/Distance'
import TypeOfGamer from '../../Forms/TypeOfGamer'

const FilterAllGames = ({ distance, setDistance }) => {
  return (
    <form className={styles.filter}>
      <Distance distance={distance} setDistance={setDistance} />
      <FormAge />
      <TypeOfGamer />
    </form>
  )
}

export default FilterAllGames
