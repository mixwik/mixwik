import { UserIcon } from '../../components/Svg'
import styles from './CardHome.module.scss'

const CardHome = ({ name, description }) => {
  return (
    <article className={styles.cardHome}>
      <UserIcon />
      <div>
        <h3>{name}</h3>
        <p>{description}</p>
      </div>
    </article>
  )
}

export default CardHome
