// Styles
import styles from '../Filters.module.scss'

// Components
import FormAge from '../../Forms/Age'
import TypeOfGamer from '../../Forms/TypeOfGamer'
import FormPosition from '../../Forms/Csgo/Position'
import FormLevel from '../../Forms/Csgo/Level'
import Distance from '../../Forms/Distance'

export const FilterCs2 = ({ distance, setDistance }) => {
  return (
    <div className={styles.filter}>
      <Distance distance={distance} setDistance={setDistance} />
      <FormAge />
      <FormPosition />
      <FormLevel />
      <TypeOfGamer />
    </div>
  )
}
