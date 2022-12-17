// Styles
import styles from './Map.module.scss'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'
import 'leaflet-defaulticon-compatibility'

// Leaflet
import { MapContainer, TileLayer } from 'react-leaflet'

// Components
import Markers from './Marker'

const Map = ({ location, db }) => {
  return (
    <>

      <MapContainer
        className={styles.map}
        center={location}
        zoom={11}
        scrollWheelZoom
      >
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {
        db.venues.map((res, index) => (
          <Markers key={index} position={res.geometry} popup={res.name} />
        ))
      }
      </MapContainer>
      <div>
        {
          db.venues.map((res, index) => (
            <li key={index}>{res.geometry[0] * res.geometry[1]}</li>
          ))
        }
      </div>
    </>
  )
}

export default Map
