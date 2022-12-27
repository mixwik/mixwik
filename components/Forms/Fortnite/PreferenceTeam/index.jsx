import styles from '../../Forms.module.scss'
import { useSetFilterContext, useFilterContext } from '../../../../context'

const FormPreferenceTeam = () => {
  const handleSetFilter = useSetFilterContext()
  const filter = useFilterContext()
  return (
    <section className={styles.formFilter}>
      <h3 className={styles.title}>Preferencia team</h3>
      <label name='preferenceTeam'>
        2 vs 2
        <input
          type='checkbox'
          value='2 vs 2'
          name='preferenceTeam'
          checked={filter.preferenceTeam.includes('2 vs 2')}
          onClick={(e) => handleSetFilter(e.target)}
        />
      </label>
      <label name='preferenceTeam'>
        3 vs 3
        <input
          type='checkbox'
          value='3 vs 3'
          name='preferenceTeam'
          checked={filter.preferenceTeam.includes('3 vs 3')}
          onChange={(e) => handleSetFilter(e.target)}
        />
      </label>
      <label name='preferenceTeam'>
        4 vs 4
        <input
          type='checkbox'
          value='4 vs 4'
          name='preferenceTeam'
          checked={filter.preferenceTeam.includes('4 vs 4')}
          onChange={(e) => handleSetFilter(e.target)}
        />
      </label>
    </section>
  )
}
export default FormPreferenceTeam
