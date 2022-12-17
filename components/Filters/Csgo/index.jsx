// Hooks
import { useState } from 'react'

// Styles
import styles from './FilterCsgo.module.scss'

// Components
import FormAge from '../../Forms/age'
import TypeOfGamer from '../../Forms/TypeOfGamer'

const FilterCsgo = () => {
  const [age, setAge] = useState(0)
  return (
    <section className={styles.filter}>
      <form>
        <FormAge state={age} setState={setAge} />
        <TypeOfGamer />
      </form>
      {age}
    </section>
  )
}

export default FilterCsgo
