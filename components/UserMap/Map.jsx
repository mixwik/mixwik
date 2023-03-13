// Styles
import styles from './Map.module.scss'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'
import 'leaflet-defaulticon-compatibility'

// Leaflet
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'

// Components
import L from 'leaflet'

const Map = ({ user }) => {
  const icon = L.divIcon({
    className: styles.customIcon,
    iconSize: [40, 40],
    crossOrigin: true
  })

  return (
    <MapContainer
      className={styles.map}
      center={user.geometry}
      zoomAnimation
      doubleClickZoom={false}
      zoom={13}
      maxZoom={14}
    >
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <Marker position={user.geometry} icon={icon}>
        <Popup>
          {user.name}
        </Popup>
      </Marker>

    </MapContainer>

  )
}

export default Map
