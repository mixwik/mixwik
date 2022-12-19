import styles from '../Forms.module.scss'

const FormPosition = ({ state, setState }) => {
  const handlePosition = (e) => {
    setState(e.target.value)
  }
  return (
    <section className={styles.formFilter}>
      <h3 className={styles.title}>Posición</h3>
      <label htmlFor='position'>
        Entry Fragger
        <input type='checkbox' value='Entry fragger' name='position' onClick={(e) => handlePosition(e)} />
      </label>
      <label htmlFor='position'>
        In-game leader
        <input type='checkbox' value='In-game leader' name='position' onChange={(e) => handlePosition(e)} />
      </label>
      <label htmlFor='position'>
        AWPer
        <input type='checkbox' value='AWPer' name='position' onChange={(e) => handlePosition(e)} />
      </label>
      <label htmlFor='position'>
        Lurker
        <input type='checkbox' value='Lurker' name='position' onChange={(e) => handlePosition(e)} />
      </label>
      <label htmlFor='position'>
        Playmaker
        <input type='checkbox' value='Playmaker' name='position' onChange={(e) => handlePosition(e)} />
      </label>
      <label htmlFor='position'>
        Support
        <input type='checkbox' value='Support' name='position' onChange={(e) => handlePosition(e)} />
      </label>
      <label htmlFor='position'>
        Entrenador
        <input type='checkbox' value='Entrenador' name='position' onChange={(e) => handlePosition(e)} />
      </label>
      <label htmlFor='position'>
        Secondary AWPer
        <input type='checkbox' value='Secondary AWPer' name='position' onChange={(e) => handlePosition(e)} />
      </label>
    </section>
  )
}
export default FormPosition
