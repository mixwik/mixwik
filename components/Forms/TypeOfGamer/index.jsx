import { useSetFilterContext, useFilterContext } from '../../../context'
import styles from '../Forms.module.scss'

const TypeOfGamer = () => {
  const handleSetFilter = useSetFilterContext()
  const filter = useFilterContext()
  return (
    <section className={styles.formFilter}>
      <h3 className={styles.title}>Tipo de Jugador</h3>
      <label name='typeOfGamer'>
        Casual
        <input
          type='checkbox'
          checked={filter.typeOfGamer.includes('casual')}
          value='casual'
          name='typeOfGamer'
          onClick={(e) => handleSetFilter(e.target)}
        />
      </label>
      <label name='typeOfGamer'>
        Competitivo
        <input
          type='checkbox'
          checked={filter.typeOfGamer.includes('competitive')}
          value='competitive'
          name='typeOfGamer'
          onChange={(e) => handleSetFilter(e.target)}
        />
      </label>

    </section>
  )
}
export default TypeOfGamer
