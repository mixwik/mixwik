import Image from 'next/image'
import { myLoader } from '../../../../components/myLoader'
import { EditIcon } from '../../../../icons/edit'

export const Header = ({ title, age, mixWikTeams, limitedAdministrator, date, image, setEdit }) => {
  const data = new Date(date.seconds * 1000)
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
        <div className='flex flex-col'>
          <h1 className='flex gap-2 text-xl font-bold'>
            {title}
            <span className='px-2 py-1 text-xs text-white rounded-full bg-aero'>
              {mixWikTeams && 'Teams'}
            </span>
          </h1>
          <p className='text-sm text-gray-500'>{age} años</p>
        </div>
      </div>
      {limitedAdministrator && <button onClick={() => setEdit(true)}><EditIcon className='size-8 fill-aero' /></button>}
      <p className='absolute text-xs text-gray-500 bottom-1 right-1'>Creado el: {data.toLocaleDateString()}</p>
    </header>
  )
}
