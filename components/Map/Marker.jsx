import L from 'leaflet'
import Image from 'next/image'
import Link from 'next/link'
import { Marker, Popup } from 'react-leaflet'
import { myLoader } from '../myLoader'
import styles from './Map.module.scss'

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

  return (
    <>
      {
        gamesCategory === 'cs2' && (
          <Marker position={position.geometry} icon={csgoIcon}>
            <Popup>
              <div className={styles.cardMap}>
                <div className={styles.profile}>
                  <Image width={0} height={0} loader={myLoader} src={user.profileImg} alt={user.name} />
                  {user.name}
                </div>
                <Link target='_blank' href={`/publicaciones/cs2/${position.id}`} rel='noreferrer'>
                  <div className={styles.publication}>
                    <Image width={0} height={0} loader={myLoader} src={position.img.url} alt={position.title} />
                    <h3>{position.title}</h3>
                    <p>{position.description.slice(0, 100)}...</p>
                  </div>
                </Link>
              </div>
            </Popup>
          </Marker>
        )
      }
      {
        gamesCategory === 'lol' && (
          <Marker position={position.geometry} icon={lolIcon}>
            <Popup>
              <div className={styles.cardMap}>
                <div className={styles.profile}>
                  <Image width={0} height={0} loader={myLoader} src={user.profileImg} alt={user.name} />
                  {user.name}
                </div>
                <Link target='_blank' href={`/publicaciones/lol/${position.id}`} rel='noreferrer'>
                  <div className={styles.publication}>
                    <Image width={0} height={0} loader={myLoader} src={position.img.url} alt={position.title} />
                    <h3>{position.title}</h3>
                    <p>{position.description.slice(0, 100)}...</p>
                  </div>
                </Link>
              </div>
            </Popup>
          </Marker>
        )
      }
      {
        gamesCategory === 'fortnite' && (
          <Marker position={position.geometry} icon={fortniteIcon}>
            <Popup>
              <div className={styles.cardMap}>
                <div className={styles.profile}>
                  <Image width={0} height={0} loader={myLoader} src={user.profileImg} alt={user.name} />
                  {user.name}
                </div>
                <Link target='_blank' href={`/publicaciones/fortnite/${position.id}`} rel='noreferrer'>
                  <div className={styles.publication}>
                    <Image width={0} height={0} loader={myLoader} src={position.img.url} alt={position.title} />
                    <h3>{position.title}</h3>
                    <p>{position.description.slice(0, 100)}...</p>
                  </div>
                </Link>
              </div>
            </Popup>
          </Marker>
        )
      }
      {
        teamsCategory === 'cs2' && (
          <Marker position={position.geometry} icon={csgoIcon}>
            <Popup>
              <div className={styles.cardMap}>
                <div className={styles.profileTeams}>
                  <Image width={0} height={0} loader={myLoader} src={user.profileImg} alt={user.name} />
                  {user.name}
                </div>
                <Link target='_blank' href={`/publicaciones/teams/cs2/${position.id}`} rel='noreferrer'>
                  <div className={styles.publication}>
                    <Image width={0} height={0} loader={myLoader} src={position.img.url} alt={position.title} />
                    <h3>{position.title}</h3>
                    <p>{position.description.slice(0, 100)}...</p>
                  </div>
                </Link>
              </div>
            </Popup>
          </Marker>
        )
      }
      {
        teamsCategory === 'lol' && (
          <Marker position={position.geometry} icon={lolIcon}>
            <Popup>
              <div className={styles.cardMap}>
                <div className={styles.profileTeams}>
                  <Image width={0} height={0} loader={myLoader} src={user.profileImg} alt={user.name} />
                  {user.name}
                </div>
                <Link target='_blank' href={`/publicaciones/teams/csgo/${position.id}`} rel='noreferrer'>
                  <div className={styles.publication}>
                    <Image width={0} height={0} loader={myLoader} src={position.img.url} alt={position.title} />
                    <h3>{position.title}</h3>
                    <p>{position.description.slice(0, 100)}...</p>
                  </div>
                </Link>
              </div>
            </Popup>
          </Marker>
        )
      }
      {
        teamsCategory === 'fortnite' && (
          <Marker position={position.geometry} icon={fortniteIcon}>
            <Popup>
              <div className={styles.cardMap}>
                <div className={styles.profileTeams}>
                  <Image width={0} height={0} loader={myLoader} src={user.profileImg} alt={user.name} />
                  {user.name}
                </div>
                <Link target='_blank' href={`/publicaciones/teams/csgo/${position.id}`} rel='noreferrer'>
                  <div className={styles.publication}>
                    <Image width={0} height={0} loader={myLoader} src={position.img.url} alt={position.title} />
                    <h3>{position.title}</h3>
                    <p>{position.description.slice(0, 100)}...</p>
                  </div>
                </Link>
              </div>
            </Popup>
          </Marker>
        )
      }
    </>

  )
}

export default Markers
