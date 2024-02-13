import { useFilterContext, useHandleOpenContext, useOpenContext, useSetFilterContext } from '../../../../context'
import { LOL_LEVELS } from '../../../../domain/constants'
import { GameLevel } from '../../../Svg'
import styles from '../../Forms.module.scss'

const FormLevel = () => {
  const handleSetFilter = useSetFilterContext()
  const filter = useFilterContext()
  const isOpen = useOpenContext()
  const handleOpen = useHandleOpenContext()

  return (
    <section className={styles.formFilter}>
      <h3
        className={styles.title}
        onClick={() => handleOpen('level')}
        data-active={filter.level.length > 0}
      >
        <GameLevel />
        Nivel
      </h3>
      {
        isOpen === 'level' && (
          <div className={styles.inputsBox}>
            {LOL_LEVELS.map(level => (
              <label key={level} name='level'>
                {level}
                <input
                  type='checkbox'
                  value={level}
                  name='level'
                  checked={filter.level.includes(level)}
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

export default FormLevel
