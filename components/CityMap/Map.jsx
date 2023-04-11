// Styles
import 'leaflet-defaulticon-compatibility'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'
import 'leaflet/dist/leaflet.css'
import styles from './Map.module.scss'

// Leaflet
import { MapContainer, TileLayer } from 'react-leaflet'
import Markers from './Markers'

// Components

const Map = ({ city, publication, users }) => {
  return (
    <MapContainer
      className={styles.map}
      center={city}
      zoomAnimation
      doubleClickZoom={false}
      zoom={14}
      minZoom={13}
      maxZoom={16}
      scrollWheelZoom={false}
    >
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {
        publication.map(position => (
          <Markers
            key={position.id}
            position={position}
            users={users}
          />
        ))
      }
    </MapContainer>
  )
}

export default Map
