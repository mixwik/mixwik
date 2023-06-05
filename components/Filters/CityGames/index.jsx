// Styles
import styles from '../Filters.module.scss'

// Components
import FormAge from '../../Forms/Age'
import TypeOfGamer from '../../Forms/TypeOfGamer'

const FilterCityGames = () => {
  return (
    <form className={styles.filter}>
      <FormAge />
      <TypeOfGamer />
    </form>
  )
}

export default FilterCityGames
