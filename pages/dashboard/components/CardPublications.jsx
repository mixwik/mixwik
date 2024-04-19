import Image from 'next/image'
import Link from 'next/link'
import { myLoader } from '../../../components/myLoader'
import { COLLECTIONS } from '../../../domain/constants'
import { deletePublication } from '../../../firebase/hooks/deleteMethod'
import { removeFavorites } from '../hooks/remove-favorites'

const CardPublications = ({ publication, equip, updateFav, remove, user }) => {
  const category = equip ? COLLECTIONS.teams : publication.category

  const handleClick = () => {
    if (updateFav) {
      removeFavorites(user.uid, publication.id)
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
    <section className='flex flex-col justify-between h-40 overflow-hidden bg-gray-100 rounded-md shadow-xl w-80'>
      <Link className='relative flex items-center justify-center size-full' href={`/publicaciones/juegos/${publication?.id}?type=${publication?.type}&category=${publication?.category}`}>
        <Image className='absolute top-0 left-0 w-full h-full' loader={myLoader} width={0} height={0} src={publication.img.url} alt={publication.title} />
        <div className='absolute bottom-0 w-full text-white bg-black/50'>
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
