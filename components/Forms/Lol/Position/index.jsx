import { useFilterContext, useHandleOpenContext, useOpenContext, useSetFilterContext } from '../../../../context'
import { GamePosition } from '../../../Svg'
import styles from '../../Forms.module.scss'

const FormPosition = () => {
  const handleSetFilter = useSetFilterContext()
  const filter = useFilterContext()
  const isOpen = useOpenContext()
  const handleOpen = useHandleOpenContext()
  return (
    <section className={styles.formFilter}>
      <h3
        className={styles.title}
        onClick={() => handleOpen('position')}
        data-active={filter.position.length > 0}
      >
        <GamePosition />
        Posición
      </h3>
      {
        isOpen === 'position' && (
          <div className={styles.inputsBox}>
            <label name='position'>
              Toplane
              <input
                type='checkbox'
                value='Toplane'
                name='position'
                checked={filter.position.includes('Toplane')}
                onClick={(e) => handleSetFilter(e.target)}
              />
            </label>
            <label name='position'>
              Midlane
              <input
                type='checkbox'
                value='Midlane'
                name='position'
                checked={filter.position.includes('Midlane')}
                onChange={(e) => handleSetFilter(e.target)}
              />
            </label>
            <label name='position'>
              Jungla
              <input
                type='checkbox'
                value='Jungla'
                name='position'
                checked={filter.position.includes('Jungla')}
                onChange={(e) => handleSetFilter(e.target)}
              />
            </label>
            <label name='position'>
              ADC
              <input
                type='checkbox'
                value='ADC'
                name='position'
                checked={filter.position.includes('ADC')}
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
