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
              Iniciador
              <input
                type='checkbox'
                value='Iniciador'
                name='position'
                checked={filter.position.includes('Iniciador')}
                onClick={(e) => handleSetFilter(e.target)}
              />
            </label>
            <label name='position'>
              Duelista
              <input
                type='checkbox'
                value='Duelista'
                name='position'
                checked={filter.position.includes('Duelista')}
                onChange={(e) => handleSetFilter(e.target)}
              />
            </label>
            <label name='position'>
              Centinela
              <input
                type='checkbox'
                value='Centinela'
                name='position'
                checked={filter.position.includes('Centinela')}
                onChange={(e) => handleSetFilter(e.target)}
              />
            </label>
            <label name='position'>
              Controlador
              <input
                type='checkbox'
                value='Controlador'
                name='position'
                checked={filter.position.includes('Controlador')}
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
