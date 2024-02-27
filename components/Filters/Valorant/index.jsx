// Styles
import styles from '../Filters.module.scss'

// Components
import { VALORANT_LEVELS } from '../../../domain/constants'
import FormAge from '../../Forms/Age'
import Distance from '../../Forms/Distance'
import TypeOfGamer from '../../Forms/TypeOfGamer'
import FormPosition from '../../Forms/valorant/Position'
import { LevelFilter } from '../components/LevelFilter'

export const FilterValorant = ({ distance, setDistance }) => {
  return (
    <form className={styles.filter}>
      <Distance distance={distance} setDistance={setDistance} />
      <FormAge />
      <FormPosition />
      <LevelFilter filterForm={VALORANT_LEVELS} />
      <TypeOfGamer />
    </form>
  )
}
