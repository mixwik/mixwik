import styles from './MixWikTeams.module.scss'

import { useSignOut } from '../../../firebase/auth/SignOut'
import { useCancelRenovationSubscription, useComproveRenovationSubscription, useMixWikTeamsCheckSubscription } from '../../../hooks/useChecksStripe'
import NoTeams from './NoTeams'

const MixWikTeams = ({ user }) => {
  const handleSignOut = useSignOut()
  const mixWikTeams = useMixWikTeamsCheckSubscription(user.mixWikTeams)
  const cancelSuscription = useCancelRenovationSubscription()
  const date = useComproveRenovationSubscription(user.mixWikTeams, mixWikTeams)

  return (
    <section className={styles.mixWikTeams}>
      <div className={styles.header}>
        <h1 className={styles.title}>MixWik Teams</h1>
        <button
          className={styles.signOut}
          onClick={() => handleSignOut()}
        >
          Cerrar Sesión
        </button>
      </div>
      <section className={styles.information}>
        {
        mixWikTeams
          ? <button onClick={() => cancelSuscription(user.mixWikTeams)}>Cancelar Suscripción mixWikTeams {date}</button>
          : <NoTeams currentUser={user} />
        }
      </section>
    </section>
  )
}

export default MixWikTeams
