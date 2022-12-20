// Styles
import styles from './Map.module.scss'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'
import 'leaflet-defaulticon-compatibility'

// Leaflet
import { MapContainer, TileLayer } from 'react-leaflet'

// Components
import Markers from './Marker'

const Map = ({ location, db, distance }) => {
  return (
    <MapContainer
      className={styles.map}
      center={location}
      zoomAnimation
      zoomControl={false}
      scrollWheelZoom={false}
      doubleClickZoom={false}
      zoom={14}
    >
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {
          db.map((res, index) => (
            <Markers key={index} distance={distance} position={res.geometry} popup={res.name} />
          ))
        }
    </MapContainer>

  )
}

export default Map
