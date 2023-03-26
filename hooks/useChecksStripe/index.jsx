import { useEffect, useState } from 'react'
import Stripe from 'stripe'

export const useCheckPay = (id) => {
  const [success, setSuccess] = useState(false)
  const stripe = new Stripe('sk_test_51MhVdvEcw1KUgUdkaOYwTkXI17zpPW6BQixTZhI8yXSBIpGYkS6hF8QLpVrHTUvWB7DdX8rXva9geWEFumGEPqcJ00aXbUDaq2')

  const check = async (id, email) => {
    const session = await stripe.checkout.sessions.retrieve(id)
    // If the pay is successful obtain id of the user in Stripe
    if (session.payment_status === 'paid') {
      const subscriptions = await stripe.customers.list({ email })
      const user = subscriptions.data[0]
      setSuccess(user.id)
    } else {
      setSuccess(false)
    }
  }
  if (id) check(id)

  return success
}

export const useMixWikTeamsCheckSubscription = (stripeId) => {
  const [success, setSuccess] = useState(false)
  const stripe = new Stripe('sk_test_51MhVdvEcw1KUgUdkaOYwTkXI17zpPW6BQixTZhI8yXSBIpGYkS6hF8QLpVrHTUvWB7DdX8rXva9geWEFumGEPqcJ00aXbUDaq2')

  useEffect(() => {
    const checkSubscription = async (stripeId) => {
      const subscriptions = await stripe.subscriptions.list({ customer: stripeId })

      const activeSubscription = subscriptions.data.find(subscription => subscription.status === 'active')

      if (activeSubscription) {
        setSuccess(true)
      } else {
        setSuccess(false)
      }
    }
    if (stripeId) checkSubscription(stripeId)
  }, [stripeId])

  return success
}

export const useMixWikTeamsCheckSubscriptionFunction = () => {
  const stripe = new Stripe('sk_test_51MhVdvEcw1KUgUdkaOYwTkXI17zpPW6BQixTZhI8yXSBIpGYkS6hF8QLpVrHTUvWB7DdX8rXva9geWEFumGEPqcJ00aXbUDaq2')

  const checkSubscription = async (stripeId) => {
    const subscriptions = await stripe.subscriptions.list({ customer: stripeId })

    const activeSubscription = subscriptions.data.find(subscription => subscription.status === 'active')

    if (activeSubscription) {
      return true
    } else {
      return false
    }
  }

  return checkSubscription
}

export const useCancelRenovationSubscription = () => {
  const stripe = new Stripe('sk_test_51MhVdvEcw1KUgUdkaOYwTkXI17zpPW6BQixTZhI8yXSBIpGYkS6hF8QLpVrHTUvWB7DdX8rXva9geWEFumGEPqcJ00aXbUDaq2')

  const cancelSubscription = async (stripeId) => {
    const subscriptions = await stripe.subscriptions.list({ customer: stripeId })

    const activeSubscription = subscriptions.data.find(subscription => subscription.status === 'active')

    if (activeSubscription) {
      await stripe.subscriptions.update(activeSubscription.id, { cancel_at_period_end: true })
    }
  }

  return cancelSubscription
}
