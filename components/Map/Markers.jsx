import L from 'leaflet'
import { COLLECTIONS } from '../../domain/constants'
import GameMarker from './GameMarker'
import styles from './Map.module.scss'
import TeamMarker from './TeamMarker'

const Markers = ({ position, users, currentPosition, gamesCategory, teamsCategory }) => {
  const user = users.find(find => find.uid === position.uid)

  if (!position || !currentPosition) return <div>Loading...</div>

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
        gamesCategory === COLLECTIONS.cs2 && (
          <GameMarker
            user={user}
            position={position}
            icon={csgoIcon}
            gamesCategory={gamesCategory}
          />
        )
      }
      {
        gamesCategory === COLLECTIONS.lol && (
          <GameMarker
            user={user}
            position={position}
            icon={lolIcon}
            gamesCategory={gamesCategory}
          />
        )
      }
      {
        gamesCategory === COLLECTIONS.fortnite && (
          <GameMarker
            user={user}
            position={position}
            icon={fortniteIcon}
            gamesCategory={gamesCategory}
          />
        )
      }
      {
        gamesCategory === COLLECTIONS.valorant && (
          <GameMarker
            user={user}
            position={position}
            icon={valorantIcon}
            gamesCategory={gamesCategory}
          />
        )
      }
      {
        teamsCategory === COLLECTIONS.cs2 && (
          <TeamMarker
            icon={csgoIcon}
            user={user}
            position={position}
          />
        )
      }
      {
        teamsCategory === COLLECTIONS.lol && (
          <TeamMarker
            icon={lolIcon}
            user={user}
            position={position}
          />
        )
      }
      {
        teamsCategory === COLLECTIONS.fortnite && (
          <TeamMarker
            icon={fortniteIcon}
            user={user}
            position={position}
          />
        )
      }
      {
        teamsCategory === COLLECTIONS.valorant && (
          <TeamMarker
            icon={valorantIcon}
            user={user}
            position={position}
          />
        )
      }
    </>

  )
}

export default Markers
