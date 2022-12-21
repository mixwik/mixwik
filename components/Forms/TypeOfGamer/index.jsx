import styles from '../Forms.module.scss'

const TypeOfGamer = ({ state, setState }) => {
  const handleTypeOfGamer = (e) => {
    if (state.includes(e)) {
      const newState = state.filter(item => item !== e)
      setState(newState)
    } else {
      setState(state.concat(e))
    }
  }
  return (
    <section className={styles.formFilter}>
      <h3 className={styles.title}>Tipo de Jugador</h3>
      <label name='typeOfGamer'>
        Casual
        <input type='checkbox' value='casual' name='typeOfGamer' onClick={(e) => handleTypeOfGamer(e.target.value)} />
      </label>
      <label name='typeOfGamer'>
        Competitivo
        <input type='checkbox' value='competitive' name='typeOfGamer' onChange={(e) => handleTypeOfGamer(e.target.value)} />
      </label>

    </section>
  )
}
export default TypeOfGamer
