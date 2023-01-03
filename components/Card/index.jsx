// Styles
import styles from './Card.module.scss'

// Next Components
import Image from 'next/image'

const Card = ({ general, specific }) => {
  return (
    <section className={styles.card}>
      <Image width={0} height={0} src={general.image} alt={general.name} />
      <h3 className={styles.title}>{general.name}</h3>
      <div className={styles.description}>
        {specific.description}
      </div>
      <div className={styles.typeOfGamer}>{specific.typeOfGamer}</div>
    </section>
  )
}

export default Card
