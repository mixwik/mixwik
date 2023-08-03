import Image from 'next/image'
import Link from 'next/link'
import { Marker, Popup } from 'react-leaflet'
import { COLLECTIONS } from '../../domain/constants'
import { myLoader } from '../myLoader'
import styles from './Map.module.scss'

const TeamMarker = ({ user, position, icon }) => {
  return (
    <Marker position={position.geometry} icon={icon}>
      <Popup>
        <div className={styles.cardMap}>
          <div className={styles.profileTeams}>
            <Image width={0} height={0} loader={myLoader} src={user.profileImg} alt={user.name} />
            {user.name}
          </div>
          <Link target='_blank' href={`/publicaciones/juegos/${position.id}?page=${COLLECTIONS.teams}`} rel='noreferrer'>
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

export default TeamMarker
