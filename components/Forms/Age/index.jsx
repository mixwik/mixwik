import { useSetFilterContext, useFilterContext } from '../../../context'
import styles from '../Forms.module.scss'

const FormAge = ({ isOpen, handleOpen }) => {
  const handleSetFilter = useSetFilterContext()
  const filter = useFilterContext()
  return (
    <section className={styles.formFilter}>
      <h3 className={styles.title} onClick={() => handleOpen('age')}>Edad</h3>
      {
        isOpen === 'age' && (
          <div className={styles.inputsBox}>
            <label className={styles.rangeAge}>
              Elige tú rango de edad
              <div className={styles.range}>
                <input
                  type='range'
                  name='min'
                  value={filter.age.min}
                  min={18}
                  max={90}
                  onChange={(e) => handleSetFilter(e.target)}
                />
                <input
                  type='range'
                  name='max'
                  defaultValue={90}
                  value={filter.age.max}
                  min={filter.age.min}
                  max={90}
                  onChange={(e) => handleSetFilter(e.target)}
                />
              </div>
              {filter.age.min}
              -
              {filter.age.max}
            </label>
          </div>
        )
      }
    </section>
  )
}
export default FormAge
