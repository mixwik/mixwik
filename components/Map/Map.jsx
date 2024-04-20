// Styles
import 'leaflet-defaulticon-compatibility'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'
import 'leaflet/dist/leaflet.css'
import styles from './Map.module.scss'

// Leaflet
import { MapContainer, TileLayer } from 'react-leaflet'

// Components
import MapLoader from '../Loaders/MapLoader'
import Markers from './Markers'

const Map = ({ user, publications, zoom, currentPosition }) => {
  if (currentPosition.length === 0) return <MapLoader />
  return (
    <MapContainer
      className={styles.map}
      center={currentPosition || user.geometry}
      zoomAnimation
      doubleClickZoom={false}
      zoom={zoom}
      maxZoom={14}
    >
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {
        publications.map(publication => (
          <Markers
            key={publication.id}
            publication={publication}
            currentPosition={currentPosition}
            user={user}
          />
        ))
      }

    </MapContainer>

  )
}

export default Map
