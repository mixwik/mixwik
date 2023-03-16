
import Image from 'next/image'
import Link from 'next/link'
import logo from '../../../../public/logos/mixwik-logo.png'
import { CheckIcon } from '../../../Svg'
import styles from './NoMorePublications.module.scss'

const NoMorePublications = ({ noPremium, currentUser, setTeams }) => {
  return (
    <div className={styles.noMorePublications} data-open={noPremium}>
      <button className={styles.close} onClick={() => setTeams(false)}>
        <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className='feather feather-x'><line x1='18' y1='6' x2='6' y2='18' /><line x1='6' y1='6' x2='18' y2='18' /></svg>
      </button>
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
      <Link href={`https://buy.stripe.com/test_aEU2aN1Mb0vl2tO3cg?prefilled_email=${currentUser.email}&client_reference_id=${currentUser.uid}`}>Donar 5€</Link>
    </div>
  )
}

export default NoMorePublications
