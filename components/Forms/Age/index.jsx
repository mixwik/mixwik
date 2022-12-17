import styles from '../Forms.module.scss'

const FormAge = ({ state, setState }) => {
  const handleAge = (e) => {
    setState(e.target.value)
  }
  return (
    <section className={styles.age}>
      <h3 className={styles.title}>Edad</h3>
      <label htmlFor='age'>
        18 - 25
        <input type='checkbox' value={18} name='age' onClick={(e) => handleAge(e)} />
      </label>
      <label htmlFor='age'>
        26 - 30
        <input type='checkbox' value={26} name='age' onChange={(e) => handleAge(e)} />
      </label>
      <label htmlFor='age'>
        31 - 40
        <input type='checkbox' value={31} name='age' onChange={(e) => handleAge(e)} />
      </label>
      <label htmlFor='age'>
        41 - 50
        <input type='checkbox' value={41} name='age' onChange={(e) => handleAge(e)} />
      </label>
      <label htmlFor='age'>
        51 - 60
        <input type='checkbox' value={51} name='age' onChange={(e) => handleAge(e)} />
      </label>
      <label htmlFor='age'>
        61 - 70
        <input type='checkbox' value={61} name='age' onChange={(e) => handleAge(e)} />
      </label>
    </section>
  )
}
export default FormAge
