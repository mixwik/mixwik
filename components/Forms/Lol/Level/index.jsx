import { useFilterContext, useHandleOpenContext, useOpenContext, useSetFilterContext } from '../../../../context'
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
            <label name='level'>
              Silver
              <input
                type='checkbox'
                value='Silver'
                name='level'
                checked={filter.level.includes('Silver')}
                onClick={(e) => handleSetFilter(e.target)}
              />
            </label>
            <label name='level'>
              Sin Nivel
              <input
                type='checkbox'
                value='Sin Nivel'
                name='level'
                checked={filter.level.includes('Sin Nivel')}
                onChange={(e) => handleSetFilter(e.target)}
              />
            </label>
            <label name='level'>
              Hierro
              <input
                type='checkbox'
                value='Hierro'
                name='level'
                checked={filter.level.includes('Hierro')}
                onChange={(e) => handleSetFilter(e.target)}
              />
            </label>
            <label name='level'>
              Bronce
              <input
                type='checkbox'
                value='Bronce'
                name='level'
                checked={filter.level.includes('Bronce')}
                onChange={(e) => handleSetFilter(e.target)}
              />
            </label>
            <label name='level'>
              Plata
              <input
                type='checkbox'
                value='Plata'
                name='level'
                checked={filter.level.includes('Plata')}
                onChange={(e) => handleSetFilter(e.target)}
              />
            </label>
            <label name='level'>
              Oro
              <input
                type='checkbox'
                value='Oro'
                name='level'
                checked={filter.level.includes('Oro')}
                onChange={(e) => handleSetFilter(e.target)}
              />
            </label>
            <label name='level'>
              Platino
              <input
                type='checkbox'
                value='Platino'
                name='level'
                checked={filter.level.includes('Platino')}
                onChange={(e) => handleSetFilter(e.target)}
              />
            </label>
            <label name='level'>
              Diamante
              <input
                type='checkbox'
                value='Diamante'
                name='level'
                checked={filter.level.includes('Diamante')}
                onChange={(e) => handleSetFilter(e.target)}
              />
            </label>
            <label name='level'>
              Maestro
              <input
                type='checkbox'
                value='Maestro'
                name='level'
                checked={filter.level.includes('Maestro')}
                onChange={(e) => handleSetFilter(e.target)}
              />
            </label>
            <label name='level'>
              Gran Maestro
              <input
                type='checkbox'
                value='Gran Maestro'
                name='level'
                checked={filter.level.includes('Gran Maestro')}
                onChange={(e) => handleSetFilter(e.target)}
              />
            </label>
            <label name='level'>
              Retador
              <input
                type='checkbox'
                value='Retador'
                name='level'
                checked={filter.level.includes('Retador')}
                onChange={(e) => handleSetFilter(e.target)}
              />
            </label>
          </div>
        )
      }

    </section>
  )
}
export default FormLevel
