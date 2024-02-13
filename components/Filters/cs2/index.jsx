// Styles
import styles from '../Filters.module.scss'

// Components
import FormAge from '../../Forms/Age'
import FormLevel from '../../Forms/Csgo/Level'
import FormPosition from '../../Forms/Csgo/Position'
import { FormPremier } from '../../Forms/Csgo/premier'
import Distance from '../../Forms/Distance'
import TypeOfGamer from '../../Forms/TypeOfGamer'

export const FilterCs2 = ({ distance, setDistance }) => {
  return (
    <div className={styles.filter}>
      <Distance distance={distance} setDistance={setDistance} />
      <FormAge />
      <FormPosition />
      <FormPremier />
      <FormLevel />
      <TypeOfGamer />
    </div>
  )
}
