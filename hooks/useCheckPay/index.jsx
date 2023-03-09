import { useState, useEffect } from 'react'
import Stripe from 'stripe'
import { useSession } from '../../firebase/auth/useSession'

export const useCheckPay = (id) => {
  const [success, setSuccess] = useState(false)
  const stripe = new Stripe('sk_test_51MhVdvEcw1KUgUdkaOYwTkXI17zpPW6BQixTZhI8yXSBIpGYkS6hF8QLpVrHTUvWB7DdX8rXva9geWEFumGEPqcJ00aXbUDaq2')

  const check = async (id) => {
    const session = await stripe.checkout.sessions.retrieve(id)
    if (session.payment_status === 'paid') {
      setSuccess('El pago ha sido completado exitosamente')
    } else {
      setSuccess('El pago ha fallado')
    }
  }
  if (id) check(id)

  return success
}
export const useCheckSuscription = (id) => {
  const session = useSession()
  const [success, setSuccess] = useState(false)
  const [user, setUser] = useState(false)
  const stripe = new Stripe('sk_test_51MhVdvEcw1KUgUdkaOYwTkXI17zpPW6BQixTZhI8yXSBIpGYkS6hF8QLpVrHTUvWB7DdX8rXva9geWEFumGEPqcJ00aXbUDaq2')
  const email = session.email

  useEffect(() => {
    const checkUser = async (email) => {
      const subscriptions = await stripe.customers.list({ email })
      const user = subscriptions.data[0]
      setUser(user)
    }
    if (id && email) checkUser(email)

    const checkSubscription = async (user) => {
      await stripe.subscriptions.list({
        customer: user.id
      }, (subscriptions) => {
        const activeSubscription = subscriptions.data.find(function (subscription) {
          return subscription.status === 'active'
        })
        if (activeSubscription) {
          setSuccess('La suscripción está activa')
        } else {
          setSuccess('La suscripción no está activa')
        }
      })
    }
    if (user) checkSubscription(user)
    console.log('usuario' + user)
  }, [email])

  return success
}
