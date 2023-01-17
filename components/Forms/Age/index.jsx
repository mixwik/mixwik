import { useSetFilterContext, useFilterContext, useOpenContext, useHandleOpenContext } from '../../../context'
import { RangeAge } from '../../Svg'
import styles from '../Forms.module.scss'

const FormAge = () => {
  const handleSetFilter = useSetFilterContext()
  const filter = useFilterContext()
  const isOpen = useOpenContext()
  const handleOpen = useHandleOpenContext()
  return (
    <section className={styles.formFilter}>
      <h3
        className={styles.title}
        onClick={() => handleOpen('age')}
        data-active={filter.age.min > 18 || filter.age.max < 90}
      >
        <RangeAge />
        Edad
      </h3>
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
