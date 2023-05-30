// Styles
import styles from '../Filters.module.scss'

// Components
import FormAge from '../../Forms/Age'
import Distance from '../../Forms/Distance'
import FormLevel from '../../Forms/Lol/Level'
import FormPosition from '../../Forms/Lol/Position'
import TypeOfGamer from '../../Forms/TypeOfGamer'

const FilterLol = ({ distance, setDistance }) => {
  return (
    <form className={styles.filter}>
      <Distance distance={distance} setDistance={setDistance} />
      <FormAge />
      <FormPosition />
      <FormLevel />
      <TypeOfGamer />
    </form>
  )
}

export default FilterLol
