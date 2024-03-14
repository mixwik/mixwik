import { useEffect, useState } from 'react'
import Stripe from 'stripe'
const key = process.env.NEXT_PUBLIC_STRIPE_KEY

export const useCheckPay = (id) => {
  const [success, setSuccess] = useState(false)
  const stripe = new Stripe(key)

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
  const stripe = new Stripe(key)

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
  const stripe = new Stripe(key)

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

export const useCancelRenovationSubscription = (reload) => {
  const stripe = new Stripe(key)

  const cancelSubscription = async (stripeId) => {
    const subscriptions = await stripe.subscriptions.list({ customer: stripeId })

    const activeSubscription = subscriptions.data.find(subscription => subscription.status === 'active')

    if (activeSubscription) {
      await stripe.subscriptions.update(activeSubscription.id, { cancel_at_period_end: true })
        .then(() => {
          if (reload) location.reload()
        })
    }
  }

  return cancelSubscription
}

export const useComproveRenovationSubscription = (stipeId, mixWikTeams) => {
  const [date, setDate] = useState('')
  const [isCancel, setIsCancel] = useState(false)
  const stripe = new Stripe(key)

  useEffect(() => {
    const checkSubscription = async (stripeId) => {
      const subscriptions = await stripe.subscriptions.list({ customer: stripeId })

      const activeSubscription = subscriptions.data[0].current_period_end

      const expirationDate = new Date(activeSubscription * 1000)
      setDate(expirationDate.toLocaleDateString())
      setIsCancel(subscriptions.data[0].cancel_at_period_end)
    }
    if (mixWikTeams) checkSubscription(stipeId)
  }, [stipeId, mixWikTeams])

  return { date, isCancel }
}
