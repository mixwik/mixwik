// Styles
import 'leaflet-defaulticon-compatibility'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'
import 'leaflet/dist/leaflet.css'
import styles from './Map.module.scss'

// Leaflet
import { MapContainer, Marker, TileLayer } from 'react-leaflet'

// Components
import L from 'leaflet'
import { COLLECTIONS } from '../../domain/constants'

const Map = ({ publication }) => {
  const cs2Icon = L.divIcon({
    className: styles.cs2Icon,
    iconSize: [100, 100],
    crossOrigin: true
  })
  const lolIcon = L.divIcon({
    className: styles.lolIcon,
    iconSize: [100, 100],
    crossOrigin: true
  })
  const fortniteIcon = L.divIcon({
    className: styles.fortniteIcon,
    iconSize: [100, 100],
    crossOrigin: true
  })
  const valorantIcon = L.divIcon({
    className: styles.valorantIcon,
    iconSize: [100, 100],
    crossOrigin: true
  })

  return (
    <MapContainer
      className={styles.map}
      center={publication.geometry}
      zoomAnimation
      doubleClickZoom={false}
      zoomControl={false}
      scrollWheelZoom={false}
      dragging={false}
      zoom={14.5}
    >
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {publication.category === COLLECTIONS.cs2 && <Marker position={publication.geometry} icon={cs2Icon} />}
      {publication.category === COLLECTIONS.lol && <Marker position={publication.geometry} icon={lolIcon} />}
      {publication.category === COLLECTIONS.valorant && <Marker position={publication.geometry} icon={valorantIcon} />}
      {publication.category === COLLECTIONS.fortnite && <Marker position={publication.geometry} icon={fortniteIcon} />}

    </MapContainer>

  )
}

export default Map
