import styles from '../Forms.module.scss'

const Distance = ({ distance, setDistance }) => {
  return (
    <div className={styles.kmSelector}>
      Distancia
      <input
        type='range'
        min={1}
        max={700}
        value={distance}
        onChange={(e) => setDistance(e.target.value)}
      />
      {distance}
    </div>
  )
}

export default Distance
