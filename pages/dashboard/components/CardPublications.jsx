import Image from 'next/image'
import Link from 'next/link'
import { myLoader } from '../../../components/myLoader'
import { COLLECTIONS } from '../../../domain/constants'
import { deletePublication } from '../../../firebase/hooks/deleteMethod'
import { setRemoveFavorites } from '../../publicaciones/components/infrastructure/setRemoveFavorites'

const CardPublications = ({ publication, equip, updateFav, remove, user }) => {
  const category = equip ? COLLECTIONS.teams : publication.category

  const handleClick = () => {
    if (updateFav) {
      setRemoveFavorites(user.uid, publication.id)
        .then(() => {
          setTimeout(() => {
            location.reload()
          }, 500)
        })
    }
    if (remove) {
      if (window.confirm('¿Estas seguro?')) {
        deletePublication(category, publication.id, user.uid, publication.category)
      }
    }
  }
  return (
    <section className='flex flex-col justify-between h-32 overflow-hidden bg-gray-100 rounded-md shadow-sm w-72 shadow-aero'>
      <Link className='flex' href={equip ? `/publicaciones/juegos/${publication.id}?page=${COLLECTIONS.teams}` : `/publicaciones/juegos/${publication.id}?page=${publication.category}`}>
        <Image className='w-20 h-20 pt-1 pl-1 rounded-full' loader={myLoader} width={0} height={0} src={publication.img.url} alt={publication.title} />
        <div>
          <h2 className='p-1 font-bold'>{publication.title.slice(0, 15)}...</h2>
          <p className='pl-1 text-sm'>{publication.description.slice(0, 35)}...</p>
        </div>
      </Link>
      <button onClick={handleClick} className='font-semibold text-white bg-pennBlue'>
        {
          remove ? 'Eliminar' : 'Quitar favorito'
        }
      </button>
    </section>
  )
}

export default CardPublications
