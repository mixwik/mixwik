import Image from 'next/image'
import Link from 'next/link'
import { myLoader } from '../../../components/myLoader'
import { useGetOneData } from '../../../firebase/hooks/getMethod/useGetOneData'
import { useUserFavorites } from '../application/useUserFavorites'

const ProfileUser = ({ mixWikTeams, currentUser, user }) => {
  const visitorUser = useGetOneData('users', user.uid)
  const { handleFavorites, errorFavorite, like } = useUserFavorites({ currentUser, visitorUser })

  return (
    <div className={`flex justify-between w-full md:w-[40vw] text-white bg-blue-300 ${mixWikTeams && 'pt-[2rem]'}`} target='_blanc'>
      <Link className='flex items-center w-full bg-pennBlue' href={`/user/${currentUser.uid}`}>
        <Image width={0} height={0} className='w-16 h-16 p-2 rounded-full' loader={myLoader} src={currentUser.profileImg} alt={`Imagen de perfil de ${currentUser.name}`} />
        {currentUser.name}
      </Link>
      <button onClick={() => handleFavorites(visitorUser.id, currentUser.uid)} className={`flex items-center justify-center w-20 bg-blue-500 ${like && 'bg-red-500'}`}>
        Like
      </button>
      {
        errorFavorite && <p className='text-red-500'>Error al dar like</p>
      }
    </div>
  )
}

export default ProfileUser
