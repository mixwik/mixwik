import styles from '../Forms.module.scss'

const FormAge = ({ state, setState }) => {
  const handleAge = (e) => {
    if (state.includes(e)) {
      const newState = state.filter(item => item !== e)
      setState(newState)
    } else {
      setState(state.concat(e))
    }
  }
  return (
    <section className={styles.formFilter}>
      <h3 className={styles.title}>Edad</h3>
      <label name='age'>
        18 - 25
        <input type='checkbox' value={[18, 25]} name='age' onClick={(e) => handleAge(e.target.value)} />
      </label>
      <label name='age'>
        26 - 30
        <input type='checkbox' value={[26, 30]} name='age' onChange={(e) => handleAge(e.target.value)} />
      </label>
      <label name='age'>
        31 - 40
        <input type='checkbox' value={[31, 40]} name='age' onChange={(e) => handleAge(e.target.value)} />
      </label>
      <label name='age'>
        41 - 50
        <input type='checkbox' value={[41, 50]} name='age' onChange={(e) => handleAge(e.target.value)} />
      </label>
      <label name='age'>
        51 - 60
        <input type='checkbox' value={[51, 60]} name='age' onChange={(e) => handleAge(e.target.value)} />
      </label>
      <label name='age'>
        61 - 70
        <input type='checkbox' value={[61, 70]} name='age' onChange={(e) => handleAge(e.target.value)} />
      </label>
    </section>
  )
}
export default FormAge
