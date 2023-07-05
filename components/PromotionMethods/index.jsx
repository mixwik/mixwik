import Link from 'next/link'
import { useState } from 'react'
import styles from './PromotionsMethods.module.scss'

const PromotionMethods = ({ promotion, limitedAdministrator, currentUser }) => {
  const [open, setOpen] = useState(false)
  return (
    <>
      {
            (limitedAdministrator && !promotion) && (
              <button onClick={() => setOpen(!open)} className={styles.promotionButton}>
                {
                open ? 'Cancelar' : 'Promocionar Publicación'
              }

              </button>
            )
          }
      <div className={styles.promotionMethods} data-active={open}>
        <section className={styles.method} data-bronze>
          <h2>Bronce</h2>
          Promociona tu publicación durante 3 días por 1€, (no se auto-renueva)
          <Link href={`https://buy.stripe.com/7sIg0231C4yo0Mw7st?prefilled_email=${currentUser.email}&client_reference_id=${currentUser.uid}`}>Comprar</Link>
        </section>
        <section className={styles.method} data-silver>
          <h2>Plata</h2>
          Promociona tu publicación durante 7 días por 2€, (no se auto-renueva)
          <Link href={`https://buy.stripe.com/4gwdRUau4gh6bra28a?prefilled_email=${currentUser.email}&client_reference_id=${currentUser.uid}`}>Comprar</Link>
        </section>
        <section className={styles.method} data-gold>
          <h2>Oro</h2>
          Promociona tu publicación durante 15 días por 3€, (no se auto-renueva)
          <Link href={`https://buy.stripe.com/3cs1589q0fd2dzi7sv?prefilled_email=${currentUser.email}&client_reference_id=${currentUser.uid}`}>Comprar</Link>
        </section>
      </div>
    </>
  )
}

export default PromotionMethods
