// Styles
import 'leaflet-defaulticon-compatibility'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'
import 'leaflet/dist/leaflet.css'
import styles from './Map.module.scss'

// Leaflet
import { MapContainer, TileLayer } from 'react-leaflet'

// Components

const Map = ({ city }) => {
  return (
    <MapContainer
      className={styles.map}
      center={city}
      zoomAnimation
      doubleClickZoom={false}
      zoom={13}
      maxZoom={14}
    >
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />

    </MapContainer>

  )
}

export default Map
