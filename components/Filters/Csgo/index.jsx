// Hooks
import { useState } from 'react'

// Styles
import styles from './FilterCsgo.module.scss'

// Components
import FormAge from '../../Forms/Age'
import TypeOfGamer from '../../Forms/TypeOfGamer'
import FormPosition from '../../Forms/Csgo/Position'

const FilterCsgo = ({ isOpen, setIsOpen }) => {
  const [age, setAge] = useState([])
  const [typeOfGamer, setTypeOfGamer] = useState([])
  const [position, setPosition] = useState([])

  return (
    <section className={styles.filter}>
      <button className={styles.buttonClose} onClick={() => setIsOpen(!isOpen)}>X</button>
      <form>
        <FormPosition state={position} setState={setPosition} />
        <FormAge state={age} setState={setAge} />
        <TypeOfGamer state={typeOfGamer} setState={setTypeOfGamer} />
      </form>
    </section>
  )
}

export default FilterCsgo
