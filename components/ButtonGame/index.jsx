// Styles

// Next Component
import Image from 'next/image'
import Link from 'next/link'
import { games } from './domain/constants'

const ButtonGame = () => {
  return (
    games.map(({ image, title, alt, link }) => (
      <Link key={title} href={link} className='relative overflow-hidden transition-transform duration-500 border-2 border-solid rounded-md border-aero hover:scale-105 size-24 md:size-28'>
        <div className={`${link === 'proximamente' ? 'bg-gray-600 opacity-70' : 'bg-pennBlueTransparent hover:bg-pennBlue'} bg-opacity-90 text-white  flex size-full flex-col justify-center items-center text-center text-sm  hover:bg-opacity-100 transition-all duration-500`}>
          <Image className='object-cover w-10 h-auto' width={60} src={image} alt={alt} />
          <span>{title}</span>
          <span className='absolute top-0 left-0 w-full text-xs bg-aero'>{link === 'proximamente' && 'Próximamente'}</span>
        </div>
      </Link>
    ))
  )
}

export default ButtonGame
