import Image from 'next/image'
import Link from 'next/link'
import { Marker, Popup } from 'react-leaflet'
import { PUBLICATION_TYPE } from '../../domain/constants'
import { myLoader } from '../myLoader'

const GameMarker = ({ icon, publication, publicationUser }) => {
  return (
    <Marker position={publication.geometry} icon={icon}>
      <Popup>
        <Link
          target='_blank'
          href={`/publicaciones/juegos/${publication.id}?type=${publication.type}&category=${publication.category}`} rel='noreferrer'
          className='relative size-52'
        >
          <div className={`absolute z-10 flex items-center justify-center top-0 left-0 w-52 h-7 ${(publication.type === PUBLICATION_TYPE.player || publication.type === PUBLICATION_TYPE.playerWithTeam) ? 'bg-aero' : 'bg-orange'}`}>
            <span className='text-xl font-bold text-white'>
              {
                publication.type === (PUBLICATION_TYPE.player || PUBLICATION_TYPE.playerWithTeam)
                  ? 'Jugador'
                  : 'Equipo'
              }
            </span>
          </div>
          <Image width={0} height={0} loader={myLoader} src={publication.img.url} alt={publication.title} className='absolute top-0 left-0 w-52 h-52' />
          <div className='absolute bottom-0 right-0 z-10 flex flex-col text-white bg-black bg-opacity-50 w-52'>
            <h3>{publication.title}</h3>
            <p>{publication.description.slice(0, 100)}...</p>
          </div>
        </Link>
      </Popup>
    </Marker>
  )
}

export default GameMarker
