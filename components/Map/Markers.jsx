import L from 'leaflet'
import { COLLECTIONS, PUBLICATION_TYPE } from '../../domain/constants'
import { useMixWikTeamsCheckSubscription } from '../../hooks/useChecksStripe'
import MapLoader from '../Loaders/MapLoader'
import GameMarker from './GameMarker'
import styles from './Map.module.scss'

const Markers = ({ publication, publicationUser, currentPosition, promotion, index }) => {
  const { isMixWikTeams } = useMixWikTeamsCheckSubscription(publicationUser?.mixWikTeams)
  if (!publication || !currentPosition) return <MapLoader />
  if (publication?.promotion && !promotion) return null
  if (publication?.type === PUBLICATION_TYPE.team && !isMixWikTeams) return null
  if (publication?.type === PUBLICATION_TYPE.playerWithTeam && !isMixWikTeams) return null

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
            publicationUser={publicationUser}
            publication={publication}
            icon={csgoIcon}
          />
        )
      }
      {
        publication.category === COLLECTIONS.lol && (
          <GameMarker
            publicationUser={publicationUser}
            publication={publication}
            icon={lolIcon}
          />
        )
      }
      {
        publication.category === COLLECTIONS.fortnite && (
          <GameMarker
            publicationUser={publicationUser}
            publication={publication}
            icon={fortniteIcon}
          />
        )
      }
      {
        publication.category === COLLECTIONS.valorant && (
          <GameMarker
            publicationUser={publicationUser}
            publication={publication}
            icon={valorantIcon}
          />
        )
      }

    </>
  )
}

export default Markers
