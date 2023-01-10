// Styles
import styles from '../Filters.module.scss'

// Components
import FormAge from '../../Forms/Age'
import TypeOfGamer from '../../Forms/TypeOfGamer'
import FormPosition from '../../Forms/Fortnite/Position'
import FormPreferenceTeam from '../../Forms/Fortnite/PreferenceTeam'
import Distance from '../../Forms/Distance'

const FilterFortnite = ({ distance, setDistance }) => {
  return (
    <form className={styles.filter}>
      <Distance distance={distance} setDistance={setDistance} />
      <FormPosition />
      <FormPreferenceTeam />
      <FormAge />
      <TypeOfGamer />
    </form>
  )
}

export default FilterFortnite
