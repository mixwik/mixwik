import styles from '../Forms.module.scss'

const TypeOfGamer = ({ state, setState }) => {
  const handleAge = (e) => {
    setState(e.target.value)
  }
  return (
    <section className={styles.age}>
      <h3 className={styles.title}>Tipo de Jugador</h3>
      <label htmlFor='age'>
        Casual
        <input type='checkbox' value='casual' name='age' onClick={(e) => handleAge(e)} />
      </label>
      <label htmlFor='age'>
        Competitivo
        <input type='checkbox' value='competitive' name='age' onChange={(e) => handleAge(e)} />
      </label>
    </section>
  )
}
export default TypeOfGamer
