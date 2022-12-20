import { useState } from 'react'

import styles from '../../Forms.module.scss'

const FormPosition = ({ state, setState }) => {
  const [isOpen, setIsOpen] = useState(false)
  const handlePosition = (e) => {
    setState(e.target.value)
  }
  return (
    <section className={styles.formFilter}>
      <h3 className={styles.title} onClick={() => setIsOpen(!isOpen)}>Posición</h3>
      <label name='position'>
        Entry Fragger
        <input type='checkbox' value='Entry fragger' name='position' onClick={(e) => handlePosition(e)} />
      </label>
      <label name='position'>
        In-game leader
        <input type='checkbox' value='In-game leader' name='position' onChange={(e) => handlePosition(e)} />
      </label>
      <label name='position'>
        AWPer
        <input type='checkbox' value='AWPer' name='position' onChange={(e) => handlePosition(e)} />
      </label>
      <label name='position'>
        Lurker
        <input type='checkbox' value='Lurker' name='position' onChange={(e) => handlePosition(e)} />
      </label>
      <label name='position'>
        Playmaker
        <input type='checkbox' value='Playmaker' name='position' onChange={(e) => handlePosition(e)} />
      </label>
      <label name='position'>
        Support
        <input type='checkbox' value='Support' name='position' onChange={(e) => handlePosition(e)} />
      </label>
      <label name='position'>
        Entrenador
        <input type='checkbox' value='Entrenador' name='position' onChange={(e) => handlePosition(e)} />
      </label>
      <label name='position'>
        Secondary AWPer
        <input type='checkbox' value='Secondary AWPer' name='position' onChange={(e) => handlePosition(e)} />
      </label>
    </section>
  )
}
export default FormPosition
