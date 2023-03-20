import L from 'leaflet'
import Link from 'next/link'
import { Marker, Popup } from 'react-leaflet'
import styles from './Map.module.scss'

const Markers = ({ position, users, currentPosition }) => {
  const user = users.find(find => find.uid === position.uid)

  if (!position || !currentPosition) return <div>Loading...</div>
  const icon = L.divIcon({
    className: styles.customIcon,
    iconSize: [40, 40],
    crossOrigin: true
  })
  // const actualPosition = L.divIcon({
  //   className: styles.actualPosition,
  //   iconSize: [40, 40],
  //   crossOrigin: true
  // })

  return (
    <>
      <Marker position={position.geometry} icon={icon}>
        <Popup>
          <div className={styles.cardMap}>
            {user.name}
            <Link target='_blanck' href={`/csgo/usuario/${position.id}`}>Ir a publicación</Link>
          </div>
        </Popup>
      </Marker>

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
