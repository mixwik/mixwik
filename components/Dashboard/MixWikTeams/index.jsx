import styles from './MixWikTeams.module.scss'

import { useMixWikTeamsCheckSubscription } from '../../../hooks/useChecksStripe'
import NoTeams from './NoTeams'
import Teams from './Teams'

const MixWikTeams = ({ user }) => {
  const mixWikTeams = useMixWikTeamsCheckSubscription(user.mixWikTeams)

  return (
    <section className={styles.mixWikTeams}>
      <div className={styles.header}>
        <h1 className={styles.title}>MixWik Teams</h1>
      </div>
      <section className={styles.information}>
        {
        mixWikTeams
          ? <Teams currentUser={user} mixWikTeams={mixWikTeams} />
          : <NoTeams currentUser={user} />
        }
      </section>
    </section>
  )
}

export default MixWikTeams
