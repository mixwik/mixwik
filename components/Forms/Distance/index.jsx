import { useHandleOpenContext, useOpenContext } from '../../../context'
import { useMaster } from '../../../hooks/useMaster'
import { PositionMap } from '../../Svg'
import styles from '../Forms.module.scss'

const Distance = ({ distance, setDistance }) => {
  const isOpen = useOpenContext()
  const handleOpen = useHandleOpenContext()
  const { master } = useMaster()
  console.log(master)

  return (
    <section className={styles.formFilter}>
      <h3
        className={styles.title}
        onClick={() => handleOpen('distance')}
        data-active={distance < 700}
      >
        <PositionMap />
        Distancia
      </h3>
      {
        isOpen === 'distance' && (
          <div className={styles.inputsBox}>
            <label className={styles.distance}>
              <span>Elige la distancia</span>
              <input
                type='range'
                min={1}
                max={master ? 20000 : 700}
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
