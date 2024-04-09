// React
import { useEffect, useState } from 'react'

// NextJS Components
import Link from 'next/link'
import { useRouter } from 'next/router'
import { BackgroundDots } from '../../components/background-dots.tsx'

// Firebase
import PrivateRoute from '../../firebase/auth/PrivateRoute'
import { useSession } from '../../firebase/auth/useSession'
import { updatePublicationPromotion, updateUserCopper, updateUserGold, updateUserSilver } from '../../firebase/hooks/updateMethod/updateUserData'

// Components
import { PublicationCard } from './components/publication-card.tsx'
// Hooks
import { CATEGORIES, COLLECTIONS } from '../../domain/constants'
import { useGetOneData } from '../../firebase/hooks/getMethod/useGetOneData'
import { useCancelRenovationSubscription, useCheckPay } from '../../hooks/useChecksStripe'
import { useGetAllGamesAndTeams } from '../user/hooks/use-get-all-games-and-teams.tsx'
import { Loading } from './components/loading.tsx'

const Promotion = () => {
  const [loading, setLoading] = useState(true)
  setTimeout(() => setLoading(false), 3000)
  const router = useRouter()
  const { id, method } = router.query
  const { userProvider } = useSession()
  const user = useGetOneData(COLLECTIONS.users, userProvider?.uid)
  const stripeId = useCheckPay(id, userProvider?.email)
  const { games, teams } = useGetAllGamesAndTeams(userProvider.uid)
  const cancelSubscription = useCancelRenovationSubscription()

  if (stripeId && user.id && method === '2m25S789gDS8') updateUserCopper(stripeId, user.id, router)
  if (stripeId && user.id && method === '236dgER88954SE') updateUserSilver(stripeId, user.id, router)
  if (stripeId && user.id && method === '89SD568ed45SDEj') updateUserGold(stripeId, user.id, router)

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault()
      event.returnValue = ''
      const confirmationMessage = '¡ATENCIÓN! Si cierras esta pestaña sin elegir una publicación la promoción no se llevará acabo';
      (event || window.event).returnValue = confirmationMessage // Gecko + IE
      return confirmationMessage // Webkit, Safari, Chrome etc.
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [])

  const handlePromotion = (name, payID, id) => {
    if (window.confirm('¿Estás seguro de aplicar la promoción a esta publicación?')) {
      cancelSubscription(payID)
      updatePublicationPromotion(name, payID, id, router)
    }
  }

  if (!stripeId || loading) return <Loading />

  if (stripeId === user.cobre) return <div className=''>Ya tienes la promoción activada <Link href='/'>Ir a la Home</Link></div>

  return (
    <section className='flex flex-col items-center justify-center w-screen h-screen'>
      <BackgroundDots />
      <div className='flex flex-col items-center h-full gap-10 p-5 overflow-scroll bg-white rounded-md md:w-1/2 size-full no-scrollbar'>
        <p className='font-bold text-red-500'>¡ATENCIÓN! No cierres esta venta hasta seleccionar una publicación.</p>
        <p className='text-xl font-bold'>¡Gracias por tu compra!.
          Elige la publicación que quieres <span className='text-aero'>promocionar</span>.
        </p>
        <div className='flex flex-col w-full gap-10'>
          {
            teams.length > 0 && (
              <div className=''>
                <h2 className='p-5 text-xl font-bold'>Equipos</h2>
                <div className='flex flex-wrap gap-5'>
                  {
                    teams.map(publication => (
                      <PublicationCard key={publication.id} handlePromotion={handlePromotion} publication={publication} stripeId={stripeId} category={CATEGORIES.teams} />
                    ))
                  }
                </div>
              </div>
            )
          }
          {
            games.length > 0 && (
              <div className=''>
                <h2 className='p-5 text-xl font-bold'>Jugadores</h2>
                <div className='flex flex-wrap gap-5'>
                  {
                    games.map(publication => (
                      <PublicationCard key={publication.id} handlePromotion={handlePromotion} publication={publication} stripeId={stripeId} category={publication.category} />
                    ))
                  }
                </div>
              </div>
            )
          }
        </div>
      </div>
    </section>
  )
}

export default Promotion

Promotion.Auth = PrivateRoute
