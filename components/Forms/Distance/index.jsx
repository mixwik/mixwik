import styles from '../Forms.module.scss'

const Distance = ({ distance, setDistance, isOpen, handleOpen }) => {
  return (
    <section className={styles.formFilter}>
      <h3 className={styles.title} onClick={() => handleOpen('distance')}>Distancia</h3>
      {
        isOpen === 'distance' && (
          <div className={styles.inputsBox}>
            <label className={styles.distance}>
              <input
                type='range'
                min={1}
                max={700}
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
              />
              <span>{distance}Km</span>
            </label>
          </div>
        )
      }
    </section>
  )
}

export default Distance
