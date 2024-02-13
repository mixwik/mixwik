import { useFilterContext, useHandleOpenContext, useOpenContext, useSetFilterContext } from '../../../../context'
import { FORTNITE_PREFERENCE_TEAM } from '../../../../domain/constants'
import styles from '../../Forms.module.scss'

const FormPreferenceTeam = () => {
  const handleSetFilter = useSetFilterContext()
  const filter = useFilterContext()
  const isOpen = useOpenContext()
  const handleOpen = useHandleOpenContext()

  return (
    <section className={styles.formFilter}>
      <h3
        className={styles.title}
        onClick={() => handleOpen('preferenceTeam')}
        data-active={filter.preferenceTeam.length > 0}
      >
        Preferencia de team
      </h3>
      {
        isOpen === 'preferenceTeam' && (
          <div className={styles.inputsBox}>
            {FORTNITE_PREFERENCE_TEAM.map(preference => (
              <label key={preference} name='preferenceTeam'>
                {preference}
                <input
                  type='checkbox'
                  value={preference}
                  name='preferenceTeam'
                  checked={filter.preferenceTeam.includes(preference)}
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

export default FormPreferenceTeam
