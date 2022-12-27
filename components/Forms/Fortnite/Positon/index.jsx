import styles from '../../Forms.module.scss'
import { useSetFilterContext, useFilterContext } from '../../../../context'

const FormPosition = () => {
  const handleSetFilter = useSetFilterContext()
  const filter = useFilterContext()
  return (
    <section className={styles.formFilter}>
      <h3 className={styles.title}>Posición</h3>
      <label name='position'>
        Fragger
        <input
          type='checkbox'
          value='Fragger'
          name='position'
          checked={filter.position.includes('Fragger')}
          onClick={(e) => handleSetFilter(e.target)}
        />
      </label>
      <label name='position'>
        In-game leader
        <input
          type='checkbox'
          value='In-game leader'
          name='position'
          checked={filter.position.includes('In-game leader')}
          onChange={(e) => handleSetFilter(e.target)}
        />
      </label>
      <label name='position'>
        Support
        <input
          type='checkbox'
          value='Support'
          name='position'
          checked={filter.position.includes('Support')}
          onChange={(e) => handleSetFilter(e.target)}
        />
      </label>
    </section>
  )
}
export default FormPosition
