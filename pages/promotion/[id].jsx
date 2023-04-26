// Styles
import styles from './Cobre.module.scss'

// React
import { useEffect } from 'react'

// NextJS Components
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

// Firebase
import PrivateRoute from '../../firebase/auth/PrivateRoute'
import { useSession } from '../../firebase/auth/useSession'
import { useGetMyPublications } from '../../firebase/hooks/getMethod/useGetMyPublications'
import { updatePublicationPromotion, updateUserCopper, updateUserGold, updateUserSilver } from '../../firebase/hooks/updateMethod/updateUserData'

// Components
import { myLoader } from '../../components/myLoader'

// Hooks
import { useGetOneData } from '../../firebase/hooks/getMethod/useGetOneData'
import { useCancelRenovationSubscription, useCheckPay } from '../../hooks/useChecksStripe'

const Promotion = () => {
  const router = useRouter()
  const { id, method } = router.query
  const currentUser = useSession()
  const user = useGetOneData('users', currentUser.uid)
  const stripeId = useCheckPay(id, currentUser.email)
  const csgo = useGetMyPublications('csgo', currentUser.uid)
  const teams = useGetMyPublications('teams', currentUser.uid)
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


  const handleSetCobre = (name, payID, id) => {
    if (window.confirm('¿Estás seguro de aplicar la promoción a esta publicación?')) {
      cancelSubscription(payID)
      updatePublicationPromotion(name, payID, id, router)
    }
  }

  if (!stripeId) return <div className={styles.loading}>Cargando..., ¡importante no salgas de esta pantalla!</div>

  if (stripeId === user.cobre) return <div className={styles.promotionActive}>Ya tienes la promoción activada <Link href='/'>Ir a la Home</Link></div>

  return (
    <div className={styles.cobre}>
      <p className={styles.alert}>¡ATENCIÓN! Si cierras esta pestaña sin elegir una publicación la promoción no se llevará acabo</p>
      <p className={styles.description}>¡Gracias por tu compra!.
        Elige la publicación que quieres promocionar durante 3 días
      </p>
      {
        teams && (
          <div className={styles.publicationsBox}>
            <h2>Equipos</h2>
            {
              teams.map(publication => (
                <button data-active className={styles.box} key={publication.id} onClick={() => handleSetCobre('teams', stripeId, publication.id)}>
                  <h1 className={styles.title}>{publication.title}</h1>
                  <div className={styles.filter} />
                  <Image
                    src={publication.img.url}
                    alt={publication.img.title}
                    loader={myLoader}
                    width={0}
                    height={0}
                  />
                </button>
              ))
            }
          </div>
        )
      }
      {
        csgo && (
          <div className={styles.publicationsBox}>
            <h2>CSGO</h2>
            {
              csgo.map(publication => (
                <button className={styles.box} key={publication.id} onClick={() => handleSetCobre('csgo', stripeId, publication.id)}>
                  <h1 className={styles.title}>{publication.title}</h1>
                  <div className={styles.filter} />
                  <Image
                    src={publication.img.url}
                    alt={publication.img.title}
                    loader={myLoader}
                    width={0}
                    height={0}
                  />
                </button>
              ))
            }
          </div>
        )
      }
    </div>
  )
}

export default Promotion

Promotion.Auth = PrivateRoute
