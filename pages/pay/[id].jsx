import styles from './Pay.module.scss'
import { useRouter } from 'next/router'
import PrivateRoute from '../../firebase/auth/PrivateRoute'
import { useCheckPay } from '../../hooks/useChecksStripe'
import { useSession } from '../../firebase/auth/useSession'
import { updateUserMixWikTeams } from '../../firebase/hooks/updateMethod/updateUserData'
import { useGetOneData } from '../../firebase/hooks/getMethod/useGetOneData'
import { CheckIcon } from '../../components/Svg'

const Pay = () => {
  const router = useRouter()
  const { id } = router.query
  const currentUser = useSession()
  const user = useGetOneData('users', currentUser.uid)
  const stripeId = useCheckPay(id, currentUser.email)
  if (stripeId) updateUserMixWikTeams(stripeId, user.id, router)

  return (
    <div>
      {
        stripeId
          ? (
            <div className={styles.successful}>
              <h1>Pago realizado correctamente</h1>
              <CheckIcon />
              <p>Ahora puede disfrutar de todas las ventajas que te ofrece MixWik Teams</p>
            </div>
            )
          : (
            <div>No pago</div>
            )
      }
    </div>
  )
}

export default Pay

Pay.Auth = PrivateRoute
