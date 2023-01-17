import { useSetFilterContext, useFilterContext, useHandleOpenContext, useOpenContext } from '../../../context'
import { GamerType } from '../../Svg'
import styles from '../Forms.module.scss'

const TypeOfGamer = () => {
  const handleSetFilter = useSetFilterContext()
  const filter = useFilterContext()
  const isOpen = useOpenContext()
  const handleOpen = useHandleOpenContext()
  return (
    <section className={styles.formFilter}>
      <h3
        className={styles.title}
        onClick={() => handleOpen('typeOfGamer')}
        data-active={filter.typeOfGamer.length > 0}
      >
        <GamerType />
        Tipo de Jugador
      </h3>
      {
        isOpen === 'typeOfGamer' && (
          <div className={styles.inputsBox}>
            <label name='typeOfGamer'>
              Casual
              <input
                type='checkbox'
                checked={filter.typeOfGamer.includes('Casual')}
                value='Casual'
                name='typeOfGamer'
                onClick={(e) => handleSetFilter(e.target)}
              />
            </label>
            <label name='typeOfGamer'>
              Competitivo
              <input
                type='checkbox'
                checked={filter.typeOfGamer.includes('Competitivo')}
                value='Competitivo'
                name='typeOfGamer'
                onChange={(e) => handleSetFilter(e.target)}
              />
            </label>
          </div>
        )
      }

    </section>
  )
}
export default TypeOfGamer
