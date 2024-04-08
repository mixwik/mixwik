import { useRouter } from 'next/router'
import { useState } from 'react'
import PrivateRoute from '../../firebase/auth/PrivateRoute'
import { useSession } from '../../firebase/auth/useSession'
import { updateUserMixWikTeams } from '../../firebase/hooks/updateMethod/updateUserData'
import { useCancelRenovationSubscription, useCheckPay } from '../../hooks/useChecksStripe'
import { LoadingPage } from './components/loading-page.tsx'

const Pay = () => {
  const [loading, setLoading] = useState(true)
  setTimeout(() => {
    setLoading(false)
  }, 3000)
  const router = useRouter()
  const { id } = router.query
  const { userProvider } = useSession()
  const cancelSubscription = useCancelRenovationSubscription()

  const stripeId = useCheckPay(id, userProvider?.email)
  if (stripeId && userProvider?.uid) {
    cancelSubscription(stripeId)
    updateUserMixWikTeams(stripeId, userProvider?.uid, router)
  }
  if (!stripeId || loading) return <LoadingPage />
}

export default Pay

Pay.Auth = PrivateRoute
