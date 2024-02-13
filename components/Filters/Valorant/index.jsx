// Styles
import styles from '../Filters.module.scss'

// Components
import FormAge from '../../Forms/Age'
import Distance from '../../Forms/Distance'
import TypeOfGamer from '../../Forms/TypeOfGamer'
import FormLevel from '../../Forms/valorant/Level'
import FormPosition from '../../Forms/valorant/Position'

export const FilterValorant = ({ distance, setDistance }) => {
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
