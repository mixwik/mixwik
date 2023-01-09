import styles from '../../Forms.module.scss'
import { useSetFilterContext, useFilterContext, useHandleOpenContext, useOpenContext } from '../../../../context'

const FormPosition = () => {
  const handleSetFilter = useSetFilterContext()
  const filter = useFilterContext()
  const isOpen = useOpenContext()
  const handleOpen = useHandleOpenContext()
  return (
    <section className={styles.formFilter}>
      <h3 className={styles.title} onClick={() => handleOpen('position')}>Posición</h3>
      {
        isOpen === 'position' && (
          <div className={styles.inputsBox}>
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
          </div>
        )
      }
    </section>
  )
}
export default FormPosition
