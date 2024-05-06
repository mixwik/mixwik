import Image from 'next/image'
import Link from 'next/link'
import { FavSelectedIcon } from '../../../../components/Svg'
import { myLoader } from '../../../../components/myLoader'
import { useGetOneUser } from '../../../../hooks/use-get-one-user'
import { EditIcon } from '../../../../icons/edit'
import { useDeleteLike } from '../hooks/use-delete-like'
import { useSetLike } from '../hooks/use-set-like'

export const Header = ({ userServer, age, isMixWikTeams, limitedAdministrator, date, image, setEdit, uid, id }) => {
  const data = new Date(date.seconds * 1000)
  const { setLike } = useSetLike()
  const { deleteLike } = useDeleteLike()
  const { userServer: currenUser, setRefetch } = useGetOneUser(uid)
  const handleSetLike = () => {
    setLike(uid, id)
    setRefetch(prev => !prev)
  }
  const handleDeleteLike = () => {
    deleteLike(uid, id)
    setRefetch(prev => !prev)
  }
  return (
    <header className='sticky top-0 left-0 z-20 flex items-center justify-between gap-2 p-5 bg-white shadow-md'>
      <div className='flex items-center justify-center gap-2'>
        <Image
          className='rounded-full size-10'
          src={image}
          loader={myLoader}
          width={40}
          height={40}
          alt='profile'
        />
        <Link href={`/user/${userServer.uid}`} className='flex flex-col'>
          <h1 className='flex gap-2 font-bold md:text-xl'>
            {userServer.name}
            {isMixWikTeams &&
              <span className='px-2 py-1 text-xs text-white rounded-full bg-aero'>
                Teams
              </span>}
          </h1>
          <p className='text-sm text-gray-500'>{age} años</p>
        </Link>
      </div>
      {
      limitedAdministrator
        ? <button onClick={() => setEdit(true)}><EditIcon className='size-8 fill-aero' /></button>
        : (
          <div className='relative flex items-center justify-center cursor-pointer size-16'>
            {
              currenUser?.likes?.includes(id)
                ? (
                  <button onClick={handleDeleteLike} className='flex items-center justify-center group'>
                    <FavSelectedIcon className='absolute fill-current text-pennBlue size-9' />
                    <FavSelectedIcon className='absolute text-red-500 duration-300 fill-current group-hover:scale-0 size-12' />
                  </button>
                  )
                : (
                  <button onClick={handleSetLike} className='flex items-center justify-center group'>
                    <FavSelectedIcon className='absolute fill-current text-pennBlue size-9' />
                    <FavSelectedIcon className='absolute text-red-500 duration-300 scale-0 fill-current size-12 group-hover:scale-110' />
                  </button>
                  )
            }
          </div>
          )
      }
      <p className='absolute text-xs text-gray-500 bottom-1 right-1'>Creado el: {data.toLocaleDateString()}</p>
    </header>
  )
}
