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
          <Link href={`https://buy.stripe.com/test_cN2g1DfD1di73xS149?prefilled_email=${currentUser.email}&client_reference_id=${currentUser.uid}`}>Comprar</Link>
        </section>
        <section className={styles.method} data-silver>
          <h2>Plata</h2>
          Promociona tu publicación durante 7 días por 2€, (no se auto-renueva)
          <Link href={`https://buy.stripe.com/test_00gbLnfD1di7b0k4gm?prefilled_email=${currentUser.email}&client_reference_id=${currentUser.uid}`}>Comprar</Link>
        </section>
        <section className={styles.method} data-gold>
          <h2>Oro</h2>
          Promociona tu publicación durante 15 días por 3€, (no se auto-renueva)
          <Link href={`https://buy.stripe.com/test_cN2aHj9eDdi74BW14b?prefilled_email=${currentUser.email}&client_reference_id=${currentUser.uid}`}>Comprar</Link>
        </section>
      </div>
    </>
  )
}

export default PromotionMethods
