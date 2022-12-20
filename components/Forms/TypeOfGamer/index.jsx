import { useState } from 'react'
import styles from '../Forms.module.scss'

const TypeOfGamer = ({ state, setState }) => {
  const [isOpen, setIsOpen] = useState(false)
  const handleAge = (e) => {
    setState(e.target.value)
  }
  return (
    <section className={styles.formFilter}>
      <h3 className={styles.title} onClick={() => setIsOpen(!isOpen)}>Tipo de Jugador</h3>
      <label name='typeOfGamer'>
        Casual
        <input type='checkbox' value='casual' name='typeOfGamer' onClick={(e) => handleAge(e)} />
      </label>
      <label name='typeOfGamer'>
        Competitivo
        <input type='checkbox' value='competitive' name='typeOfGamer' onChange={(e) => handleAge(e)} />
      </label>

    </section>
  )
}
export default TypeOfGamer
