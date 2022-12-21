import styles from '../../Forms.module.scss'

const FormPosition = ({ state, setState }) => {
  const handlePosition = (e) => {
    if (state.includes(e)) {
      const newState = state.filter(item => item !== e)
      setState(newState)
    } else {
      setState(state.concat(e))
    }
  }
  return (
    <section className={styles.formFilter}>
      <h3 className={styles.title}>Posición</h3>
      <label name='position'>
        Entry Fragger
        <input type='checkbox' value='Entry fragger' name='position' onClick={(e) => handlePosition(e.target.value)} />
      </label>
      <label name='position'>
        In-game leader
        <input type='checkbox' value='In-game leader' name='position' onChange={(e) => handlePosition(e.target.value)} />
      </label>
      <label name='position'>
        AWPer
        <input type='checkbox' value='AWPer' name='position' onChange={(e) => handlePosition(e.target.value)} />
      </label>
      <label name='position'>
        Lurker
        <input type='checkbox' value='Lurker' name='position' onChange={(e) => handlePosition(e.target.value)} />
      </label>
      <label name='position'>
        Playmaker
        <input type='checkbox' value='Playmaker' name='position' onChange={(e) => handlePosition(e.target.value)} />
      </label>
      <label name='position'>
        Support
        <input type='checkbox' value='Support' name='position' onChange={(e) => handlePosition(e.target.value)} />
      </label>
      <label name='position'>
        Entrenador
        <input type='checkbox' value='Entrenador' name='position' onChange={(e) => handlePosition(e.target.value)} />
      </label>
      <label name='position'>
        Secondary AWPer
        <input type='checkbox' value='Secondary AWPer' name='position' onChange={(e) => handlePosition(e.target.value)} />
      </label>
    </section>
  )
}
export default FormPosition
