import { useFilterContext, useHandleOpenContext, useOpenContext, useSetFilterContext } from '../../../../context'
import { CS2_PREMIER } from '../../../../domain/constants'
import { GameLevel } from '../../../Svg'
import styles from '../../Forms.module.scss'

export const FormPremier = () => {
  const handleSetFilter = useSetFilterContext()
  const filter = useFilterContext()
  const isOpen = useOpenContext()
  const handleOpen = useHandleOpenContext()
  return (
    <section className={styles.formFilter}>
      <h3
        className={styles.title}
        onClick={() => handleOpen('premier')}
        data-active={filter.premier.length > 0}
      >
        <GameLevel />
        Premier
      </h3>
      {
        isOpen === 'premier' && (
          <div className={styles.inputsBox}>
            {
              CS2_PREMIER.map(premier => (
                <label key={premier} name='level'>
                  {premier}
                  <input
                    type='checkbox'
                    value={premier}
                    name='premier'
                    checked={filter.premier.includes(premier)}
                    onClick={(e) => handleSetFilter(e.target)}
                  />
                </label>
              ))
            }
          </div>
        )
      }

    </section>
  )
}
