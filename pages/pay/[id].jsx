import { useRouter } from 'next/router'
import PrivateRoute from '../../firebase/auth/PrivateRoute'
import { useCheckPay, useCheckSuscription } from '../../hooks/useCheckPay'

const Pay = () => {
  const router = useRouter()
  const { id } = router.query
  const success = useCheckPay(id)
  const suscription = useCheckSuscription(id)
  console.log(suscription)

  return (
    <div>
      {
        success
      }
    </div>
  )
}

export default Pay

Pay.Auth = PrivateRoute
