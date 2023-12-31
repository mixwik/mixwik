import styles from '../../Forms.module.scss'
import { useSetFilterContext, useFilterContext, useOpenContext, useHandleOpenContext } from '../../../../context'
import { GameLevel } from '../../../Svg'

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
              Nova
              <input
                type='checkbox'
                value='Nova'
                name='level'
                checked={filter.level.includes('Nova')}
                onChange={(e) => handleSetFilter(e.target)}
              />
            </label>
            <label name='level'>
              Ak
              <input
                type='checkbox'
                value='Ak'
                name='level'
                checked={filter.level.includes('Ak')}
                onChange={(e) => handleSetFilter(e.target)}
              />
            </label>
            <label name='level'>
              Ak Laurel
              <input
                type='checkbox'
                value='Ak laurel'
                name='level'
                checked={filter.level.includes('Ak laurel')}
                onChange={(e) => handleSetFilter(e.target)}
              />
            </label>
            <label name='level'>
              Doble Ak
              <input
                type='checkbox'
                value='Doble ak'
                name='level'
                checked={filter.level.includes('Doble ak')}
                onChange={(e) => handleSetFilter(e.target)}
              />
            </label>
            <label name='level'>
              Chapa
              <input
                type='checkbox'
                value='Chapa'
                name='level'
                checked={filter.level.includes('Chapa')}
                onChange={(e) => handleSetFilter(e.target)}
              />
            </label>
            <label name='level'>
              Aguila
              <input
                type='checkbox'
                value='Aguila'
                name='level'
                checked={filter.level.includes('Aguila')}
                onChange={(e) => handleSetFilter(e.target)}
              />
            </label>
            <label name='level'>
              Aguila Laurel
              <input
                type='checkbox'
                value='Aguila laurel'
                name='level'
                checked={filter.level.includes('Aguila laurel')}
                onChange={(e) => handleSetFilter(e.target)}
              />
            </label>
            <label name='level'>
              Supreme
              <input
                type='checkbox'
                value='Supreme'
                name='level'
                checked={filter.level.includes('Supreme')}
                onChange={(e) => handleSetFilter(e.target)}
              />
            </label>
            <label name='level'>
              Global Elite
              <input
                type='checkbox'
                value='Global elite'
                name='level'
                checked={filter.level.includes('Global elite')}
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
