// Styles

// Next Component
import Image from 'next/image'
import Link from 'next/link'
import { games } from './domain/constants'

const ButtonGame = () => {
  return (
    games.map(({ image, title, alt, link }) => (
      <Link key={title} href={link} className='relative overflow-hidden border-2 border-white border-solid rounded-md'>
        <div className={`${link === 'proximamente' ? 'bg-gray-600' : 'bg-black'} bg-opacity-80 text-white w-24 h-24 md:w-32 md:h-32 flex flex-col justify-center items-center text-center text-sm  hover:bg-opacity-100 transition-all duration-500`}>
          <Image className='object-cover w-10 h-auto md:w-20' width={60} src={image} alt={alt} />
          <span>{title}</span>
          <span className='absolute top-0 left-0 w-full text-xs bg-aero'>{link === 'proximamente' && 'Próximamente'}</span>
        </div>
      </Link>
    ))
  )
}

export default ButtonGame
