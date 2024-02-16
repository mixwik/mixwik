import Image from 'next/image'
import Link from 'next/link'
import { myLoader } from '../../../components/myLoader'
import { useGetOneData } from '../../../firebase/hooks/getMethod/useGetOneData'
import { useUserFavorites } from './application/useUserFavorites'

const ProfileUser = ({ publicationUser, idPublication, userProvider }) => {
  const visitorUser = useGetOneData('users', userProvider?.uid)
  const { handleFavorites, errorFavorite, like } = useUserFavorites({ idPublication, visitorUser })
  return (
    <div className='sticky top-0 md:top-[10vh] bg-transparent z-20 flex justify-between w-full md:w-[40vw] text-white bg-blue-300'>
      <Link target='_blank' className='flex items-center w-full gap-1 font-semibold bg-pennBlue' href={`/user/${publicationUser.uid}`} rel='noreferrer'>
        <Image width={0} height={0} className='w-16 h-16 p-2 rounded-full' loader={myLoader} src={publicationUser.profileImg} alt={`Imagen de perfil de ${publicationUser.name}`} />
        {publicationUser.name}
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='w-5 h-5'>
          <path fillRule='evenodd' d='M15.75 2.25H21a.75.75 0 01.75.75v5.25a.75.75 0 01-1.5 0V4.81L8.03 17.03a.75.75 0 01-1.06-1.06L19.19 3.75h-3.44a.75.75 0 010-1.5zm-10.5 4.5a1.5 1.5 0 00-1.5 1.5v10.5a1.5 1.5 0 001.5 1.5h10.5a1.5 1.5 0 001.5-1.5V10.5a.75.75 0 011.5 0v8.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V8.25a3 3 0 013-3h8.25a.75.75 0 010 1.5H5.25z' clipRule='evenodd' />
        </svg>
      </Link>
      <button onClick={() => handleFavorites(visitorUser.id, idPublication)} className={`flex items-center text-white bg-pennBlue justify-center w-20 ${like && 'bg-gray-200'}`}>
        {
          like
            ? (
              <div className='flex flex-col items-center'>
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='w-10 h-10'>
                  <path d='M3.53 2.47a.75.75 0 00-1.06 1.06l18 18a.75.75 0 101.06-1.06l-18-18zM20.25 5.507v11.561L5.853 2.671c.15-.043.306-.075.467-.094a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93zM3.75 21V6.932l14.063 14.063L12 18.088l-7.165 3.583A.75.75 0 013.75 21z' />
                </svg>
                No fav
              </div>
              )
            : (
              <div className='flex flex-col items-center'>
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='w-10 h-10'>
                  <path fillRule='evenodd' d='M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z' clipRule='evenodd' />
                </svg>
                Fav
              </div>
              )
        }
      </button>
      {
        errorFavorite && <p className='text-red-500'>Error al dar like</p>
      }
    </div>
  )
}

export default ProfileUser
