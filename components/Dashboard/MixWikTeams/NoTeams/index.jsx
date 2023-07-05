import Image from 'next/image'
import Link from 'next/link'
import logo from '../../../../public/logos/mixwik-logo.png'
import { CheckIcon } from '../../../Svg'
import styles from './NoTeams.module.scss'

const NoTeams = ({ currentUser }) => {
  return (
    <div className={styles.noTeam}>
      <div className={styles.content}>
        <section className={styles.advantagesBox}>
          <h1 className={styles.title}>MixWik Teams</h1>
          <p>Hazte de MixWik Teams donando 5€ y obtendrás las siguientes ventajas:</p>
          <ul className={styles.advantages}>
            <li>
              <CheckIcon />
              Podrás publicar hasta 5 anuncios por categoría
            </li>
            <li>
              <CheckIcon />
              Pon hasta 7 imágenes en tus publicaciones
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
      <Link href={`https://buy.stripe.com/bIY9BEdGg7KA66QdQQ?prefilled_email=${currentUser.email}&client_reference_id=${currentUser.uid}`}>Subscribirse</Link>
    </div>
  )
}

export default NoTeams
