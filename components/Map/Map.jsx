// Styles
import 'leaflet-defaulticon-compatibility'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'
import 'leaflet/dist/leaflet.css'
import styles from './Map.module.scss'

// Leaflet
import { MapContainer, TileLayer } from 'react-leaflet'

// Components
import { useState } from 'react'
import { usePromotionCheckSubscription } from '../../hooks/useChecksStripe'
import MapLoader from '../Loaders/MapLoader'
import Markers from './Markers'
import { PUBLICATION_TYPE } from '../../domain/constants'

const Map = ({ publicationUser, publications, zoom, currentPosition }) => {
  const [promo, setPromo] = useState(false)
  const { checkSubscription } = usePromotionCheckSubscription()
  if (currentPosition.length === 0) return <MapLoader />
  return (
    <MapContainer
      className={styles.map}
      center={currentPosition || publicationUser.geometry}
      zoomAnimation
      doubleClickZoom={false}
      zoom={zoom}
      maxZoom={12}
    >
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {
        publications?.map(res => {
          const promotion = checkSubscription(res.promotion, res.category, res.id)
          promotion.then((res) => setPromo(res))
          return (
            <Markers
              key={res.id}
              publication={res}
              currentPosition={currentPosition}
              publicationUser={publicationUser}
              promotion={promo}
            />
          )
        })
      }
      {
        publications?.map(res => (
          res.type === PUBLICATION_TYPE.team && (
            <Markers
              key={res.id}
              publication={res}
              currentPosition={currentPosition}
              publicationUser={publicationUser}
            />
          )
        ))
      }
      {
        publications?.map((res, index) => (
          (res.type === PUBLICATION_TYPE.player || res.type === PUBLICATION_TYPE.playerWithTeam) && (
            <Markers
              key={res.id}
              publication={res}
              currentPosition={currentPosition}
              publicationUser={publicationUser}
              index={index}
            />
          )
        ))
      }

    </MapContainer>

  )
}

export default Map
