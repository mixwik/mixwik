import L from 'leaflet'
import Link from 'next/link'
import { Marker, Popup } from 'react-leaflet'
import styles from './Map.module.scss'

const Markers = ({ position, users, currentPosition, category }) => {
  const user = users.find(find => find.uid === position.uid)

  if (!position || !currentPosition) return <div>Loading...</div>

  const csgoIcon = L.divIcon({
    className: styles.csgoIcon,
    iconSize: [40, 40],
    crossOrigin: true
  })

  const lolIcon = L.divIcon({
    className: styles.lolIcon,
    iconSize: [40, 40],
    crossOrigin: true
  })

  return (
    <>
      {
        category === 'csgo' && (
          <Marker position={position.geometry} icon={csgoIcon}>
            <Popup>
              <div className={styles.cardMap}>
                {user.name}
                <Link target='_blanck' href={`/csgo/usuario/${position.id}`}>Ir a publicación</Link>
              </div>
            </Popup>
          </Marker>
        )
      }
      {
        category === 'lol' && (
          <Marker position={position.geometry} icon={lolIcon}>
            <Popup>
              <div className={styles.cardMap}>
                {user.name}
                <Link target='_blanck' href={`/csgo/usuario/${position.id}`}>Ir a publicación</Link>
              </div>
            </Popup>
          </Marker>
        )
      }

      {/* {
        currentPosition && (
          <Marker position={currentPosition} icon={actualPosition}>
            <Popup>
              Mi posición actual
            </Popup>
          </Marker>
        )
      } */}
    </>

  )
}

export default Markers
