import L from 'leaflet'
import Link from 'next/link'
import { Marker, Popup } from 'react-leaflet'
import styles from './Map.module.scss'

const Markers = ({ position, users }) => {
  const user = users.find(find => find.uid === position.uid)

  if (!position) return <div>Loading...</div>

  const icon = L.divIcon({
    className: styles.customIcon,
    iconSize: [40, 40],
    crossOrigin: true
  })

  return (
    <Marker position={position.geometry} icon={icon}>
      <Popup>
        <div className={styles.cardMap}>
          {user.name}
          <Link target='_blanck' href={`/csgo/usuario/${position.id}`}>Ir a publicación</Link>
        </div>
      </Popup>
    </Marker>
  )
}

export default Markers
