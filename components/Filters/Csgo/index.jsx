import styles from './FilterCsgo.module.scss'

const FilterCsgo = () => {
  return (
    <section className={styles.filter}>
      <span>Filtro CSGO</span>
      <form>
        <section className={styles.age}>
          <h2>Edad</h2>
          <label>
            18-25
            <input value='18-25' name='age' type='checkbox' />
          </label>
        </section>
      </form>
    </section>
  )
}

export default FilterCsgo
