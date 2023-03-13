import { Popup, Marker } from 'react-leaflet'
import L from 'leaflet'
import styles from './Map.module.scss'

const Markers = ({ position, users, size, currentPosition }) => {
  const user = users.find(find => find.uid === position.uid)

  if (!position || !currentPosition) return <div>Loading...</div>
  const icon = L.divIcon({
    className: styles.customIcon,
    iconSize: [40, 40],
    crossOrigin: true
  })

  return (
    <>
      <Marker position={position.geometry} icon={icon}>
        <Popup>
          {user.name}
        </Popup>
      </Marker>

      {
        currentPosition && (
          <Marker position={currentPosition} icon={icon}>
            <Popup>
              Mi posición actual
            </Popup>
          </Marker>
        )
      }
    </>

  )
}

export default Markers
