import { useRouter } from 'next/router'
import PrivateRoute from '../../firebase/auth/PrivateRoute'
import { useSession } from '../../firebase/auth/useSession'
import { useGetOneData } from '../../firebase/hooks/getMethod/useGetOneData'
import { updateUserMixWikTeams } from '../../firebase/hooks/updateMethod/updateUserData'
import { useCheckPay } from '../../hooks/useChecksStripe'

const Pay = () => {
  const router = useRouter()
  const { id } = router.query
  const currentUser = useSession()
  const user = useGetOneData('users', currentUser.uid)
  const stripeId = useCheckPay(id, currentUser.email)
  if (stripeId) updateUserMixWikTeams(stripeId, user.id, router)
  if (!stripeId) return <div>El pago no se ha realizado correctamente</div>
}

export default Pay

Pay.Auth = PrivateRoute
