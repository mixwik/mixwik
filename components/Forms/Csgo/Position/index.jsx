import styles from '../../Forms.module.scss'
import { useSetFilterContext, useFilterContext, useHandleOpenContext, useOpenContext } from '../../../../context'
import { GamePosition } from '../../../Svg'

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
              Entry Fragger
              <input
                type='checkbox'
                value='Entry fragger'
                name='position'
                checked={filter.position.includes('Entry fragger')}
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
              AWPer
              <input
                type='checkbox'
                value='AWPer'
                name='position'
                checked={filter.position.includes('AWPer')}
                onChange={(e) => handleSetFilter(e.target)}
              />
            </label>
            <label name='position'>
              Lurker
              <input
                type='checkbox'
                value='Lurker'
                name='position'
                checked={filter.position.includes('Lurker')}
                onChange={(e) => handleSetFilter(e.target)}
              />
            </label>
            <label name='position'>
              Playmaker
              <input
                type='checkbox'
                value='Playmaker'
                name='position'
                checked={filter.position.includes('Playmaker')}
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
            <label name='position'>
              Entrenador
              <input
                type='checkbox'
                value='Entrenador'
                name='position'
                checked={filter.position.includes('Entrenador')}
                onChange={(e) => handleSetFilter(e.target)}
              />
            </label>
            <label name='position'>
              Secondary AWPer
              <input
                type='checkbox'
                value='Secondary AWPer'
                name='position'
                checked={filter.position.includes('Secondary AWPer')}
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
