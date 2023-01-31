// Styles
import styles from './Map.module.scss'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'
import 'leaflet-defaulticon-compatibility'

// Leaflet
import { MapContainer, TileLayer } from 'react-leaflet'

// Components
import Markers from './Marker'

const Map = ({ location, db, zoom, size, currentPosition }) => {
  return (
    <MapContainer
      className={styles.map}
      center={currentPosition || location}
      zoomAnimation
      doubleClickZoom={false}
      zoom={zoom}
      maxZoom={14}
    >
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <Markers
        position={db}
        currentPosition={currentPosition}
        size={size}
      />

    </MapContainer>

  )
}

export default Map
