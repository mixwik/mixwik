// Styles
import styles from './Map.module.scss'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'
import 'leaflet-defaulticon-compatibility'

// Leaflet
import { MapContainer, TileLayer } from 'react-leaflet'

// Components
import Markers from './Marker'

const Map = ({ location, db, zoom, size }) => {
  return (
    <MapContainer
      className={styles.map}
      center={location}
      zoomAnimation
      doubleClickZoom={false}
      zoom={zoom}
      maxZoom={14}
    >
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {
          db.map((res, index) => (
            <Markers key={index} position={res.geometry} popup={res.name} size={size} />
          ))
        }
    </MapContainer>

  )
}

export default Map
