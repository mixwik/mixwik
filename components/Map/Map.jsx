// Styles
import styles from './Map.module.scss'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'
import 'leaflet-defaulticon-compatibility'

// Leaflet
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import { latLngBounds } from 'leaflet'

// Components
import Markers from './Marker'
import { useEffect } from 'react'

function MyComponent ({ bound }) {
  const map = useMap()
  useEffect(() => {
    map.fitBounds(bound)
  }, [map, bound])

  return null
}

const Map = ({ location, db, handleChange }) => {
  const lastUser = db.map((res) => [res.geometry])
  const bound = latLngBounds([location, lastUser])

  return (
    <MapContainer
      className={styles.map}
      center={location}
      zoomAnimation
    >
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <MyComponent handleChange={handleChange} bound={bound} />
      {
          db.map((res, index) => (
            <Markers key={index} position={res.geometry} popup={res.name} />
          ))
        }
    </MapContainer>

  )
}

export default Map
