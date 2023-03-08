
import Image from 'next/image'
import Link from 'next/link'
import styles from './NoMorePublications.module.scss'
import logo from '../../../../public/logos/mixwik-logo.png'
import { CheckIcon } from '../../../Svg'

const NoMorePublications = ({ noPremium, currentUser }) => {
  return (
    <div className={styles.noMorePublications} data-open={noPremium}>
      <div className={styles.content}>
        <section className={styles.advantagesBox}>
          <h1 className={styles.title}>MixWik Team</h1>
          <p>Hazte de MixWik Team donando 5€ y obtendrás las siguientes ventajas:</p>
          <ul className={styles.advantages}>
            <li>
              <CheckIcon />
              Podrás publicar hasta 3 anuncios por categoría
            </li>
            <li>
              <CheckIcon />
              Crea equipos y reúne jugadores para llegar a lo más alto
            </li>
            <li>
              <CheckIcon />
              Incluye vídeos en tus publicaciones
            </li>
            <li>
              <CheckIcon />
              Más enlaces hacia tus redes sociales
            </li>
          </ul>
        </section>
        <Image src={logo} alt='logo de MixWik' />
      </div>
      <Link href={`https://buy.stripe.com/test_14kaHj1Mbb9Zd8s28a?prefilled_email=${currentUser.email}&client_reference_id=${currentUser.uid}`}>Donar 5€</Link>
    </div>
  )
}

export default NoMorePublications
