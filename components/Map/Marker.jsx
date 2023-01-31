import { Popup, Marker } from 'react-leaflet'
import L from 'leaflet'
import styles from './Map.module.scss'

const Markers = ({ position, size, currentPosition }) => {
  const icon = L.divIcon({
    className: styles.customIcon,
    iconSize: [size, size],
    crossOrigin: true
  })
  const currentIcon = L.divIcon({
    className: styles.currentIcon,
    iconSize: [size, size],
    crossOrigin: true
  })

  return (
    <>
      {
      position.map((res, index) => (

        <Marker key={index} position={res.geometry} icon={icon}>
          <Popup>
            {res.name}
          </Popup>
        </Marker>
      ))
    }
      {
        currentPosition && (
          <Marker position={currentPosition} icon={currentIcon}>
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
