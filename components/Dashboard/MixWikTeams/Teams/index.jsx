// import { useCancelRenovationSubscription, useComproveRenovationSubscription } from '../../../../hooks/useChecksStripe'
import { CheckIcon } from '../../../Svg'
import styles from './Teams.module.scss'

const Teams = ({ currentUser, mixWikTeams }) => {
  // const cancelSuscription = useCancelRenovationSubscription()
  // const [date, isCancel] = useComproveRenovationSubscription(currentUser.mixWikTeams, mixWikTeams)
  return (
    <section className={styles.mixWikTeams}>
      <h2 className={styles.title}>Ya eres de MixWik Teams</h2>
      <p>Estas son tús ventajas</p>
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
      {/* {
        isCancel
          ? (
            <div className={styles.cancelRenovate}>
              <p className={styles.paragraph}>
                Su suscripción caducará el <span>{date}</span>
              </p>
            </div>
            )
          : (
            <div className={styles.cancelRenovate}>
              <p className={styles.paragraph}>Tu suscripción a MixWik Teams se renovará el <span>{date}</span></p>
              <button className={styles.cancel} onClick={() => cancelSuscription(currentUser.mixWikTeams)}>Cancelar renovación</button>
            </div>
            )
       } */}
    </section>
  )
}

export default Teams
