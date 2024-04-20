import L from 'leaflet'
import { COLLECTIONS } from '../../domain/constants'
import MapLoader from '../Loaders/MapLoader'
import GameMarker from './GameMarker'
import styles from './Map.module.scss'

const Markers = ({ publication, user, currentPosition }) => {
  if (!publication || !currentPosition) return <MapLoader />

  const csgoIcon = L.divIcon({
    className: styles.csgoIcon,
    iconSize: [40, 40],
    crossOrigin: true
  })

  const lolIcon = L.divIcon({
    className: styles.lolIcon,
    iconSize: [40, 40],
    crossOrigin: true
  })
  const fortniteIcon = L.divIcon({
    className: styles.fortniteIcon,
    iconSize: [40, 40],
    crossOrigin: true
  })
  const valorantIcon = L.divIcon({
    className: styles.valorantIcon,
    iconSize: [40, 40],
    crossOrigin: true
  })

  return (
    <>
      {
        publication.category === COLLECTIONS.cs2 && (
          <GameMarker
            user={user}
            publication={publication}
            icon={csgoIcon}
          />
        )
      }
      {
        publication.category === COLLECTIONS.lol && (
          <GameMarker
            user={user}
            publication={publication}
            icon={lolIcon}
          />
        )
      }
      {
        publication.category === COLLECTIONS.fortnite && (
          <GameMarker
            user={user}
            publication={publication}
            icon={fortniteIcon}
          />
        )
      }
      {
        publication.category === COLLECTIONS.valorant && (
          <GameMarker
            user={user}
            publication={publication}
            icon={valorantIcon}
          />
        )
      }

    </>
  )
}

export default Markers
