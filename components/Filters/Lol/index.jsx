// Styles
import styles from '../Filters.module.scss'

// Components
import FormAge from '../../Forms/Age'
import Distance from '../../Forms/Distance'
import FormPosition from '../../Forms/Lol/Position'
import TypeOfGamer from '../../Forms/TypeOfGamer'
import { LevelFilter } from '../components/LevelFilter'
import { LOL_LEVELS } from '../../../domain/constants'

const FilterLol = ({ distance, setDistance }) => {
  return (
    <form className={styles.filter}>
      <Distance distance={distance} setDistance={setDistance} />
      <FormAge />
      <FormPosition />
      <LevelFilter filterForm={LOL_LEVELS} />
      <TypeOfGamer />
    </form>
  )
}

export default FilterLol
