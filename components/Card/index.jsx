// Styles
import styles from './Card.module.scss'

// Next Components
import Image from 'next/image'

const Card = ({ general, specific, image }) => {
  return (
    <section className={styles.card}>
      <div className={styles.head}>
        <div className={styles.name}>
          <div className={styles.typeOfGamer}>{specific.typeOfGamer}</div>
          <h3 className={styles.title}>{general.name}</h3>
          <Image width={0} height={0} src={image} alt={general.name} />
        </div>
        <Image width={0} height={0} src={general.image} alt={general.name} />
      </div>
      <div className={styles.description}>
        {specific.description}
      </div>
      <ul className={styles.position}>
        {
          specific.position.map((position, index) => (
            <li key={index}>{position}</li>
          ))
        }
      </ul>
    </section>
  )
}

export default Card
