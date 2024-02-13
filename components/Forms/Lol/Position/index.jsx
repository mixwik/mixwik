import { useFilterContext, useHandleOpenContext, useOpenContext, useSetFilterContext } from '../../../../context'
import { LOL_POSITIONS } from '../../../../domain/constants'
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
            {LOL_POSITIONS.map(position => (
              <label key={position} name='position'>
                {position}
                <input
                  type='checkbox'
                  value={position}
                  name='position'
                  checked={filter.position.includes(position)}
                  onChange={(e) => handleSetFilter(e.target)}
                />
              </label>
            ))}
          </div>
        )
      }
    </section>
  )
}

export default FormPosition
