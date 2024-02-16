import { useRouter } from 'next/router'
import PrivateRoute from '../../firebase/auth/PrivateRoute'
import { useSession } from '../../firebase/auth/useSession'
import { useGetOneData } from '../../firebase/hooks/getMethod/useGetOneData'
import { updateUserMixWikTeams } from '../../firebase/hooks/updateMethod/updateUserData'
import { useCancelRenovationSubscription, useCheckPay } from '../../hooks/useChecksStripe'

const Pay = () => {
  const router = useRouter()
  const { id } = router.query
  const { userProvider } = useSession()
  const cancelSubscription = useCancelRenovationSubscription()
  const user = useGetOneData('users', userProvider?.uid)
  const stripeId = useCheckPay(id, userProvider?.email)
  if (stripeId && user.id) {
    cancelSubscription(stripeId)
    updateUserMixWikTeams(stripeId, user.id, router)
  }
  if (!stripeId) return <div>Cargando...</div>
}

export default Pay

Pay.Auth = PrivateRoute
