// Styles
import 'leaflet-defaulticon-compatibility'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'
import 'leaflet/dist/leaflet.css'
import styles from './Map.module.scss'

// Leaflet
import { MapContainer, TileLayer } from 'react-leaflet'

// Components
import Markers from './Marker'

const Map = ({ location, users, games, zoom, currentPosition }) => {
  if (currentPosition.length === 0) return <div>Loading...</div>
  return (
    <MapContainer
      className={styles.map}
      center={currentPosition || location.geometry}
      zoomAnimation
      doubleClickZoom={false}
      zoom={zoom}
      maxZoom={14}
    >
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {
        games.map(position => (
          <Markers
            key={position.id}
            position={position}
            currentPosition={currentPosition}
            users={users}
            gamesCategory={position.category}
          />
        ))
      }

    </MapContainer>

  )
}

export default Map
