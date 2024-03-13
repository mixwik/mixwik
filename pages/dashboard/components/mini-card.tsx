import Image from 'next/image'
import { myLoader } from '../../../components/myLoader'

export const MiniCard = ({ borderColor, position, bg }: {borderColor:string, position:string, bg:string}) => {
  return (
    <div className={`opacity-70 ${borderColor} ${position} flex flex-col items-center justify-center w-9 h-12 gap-1 p-1 border border-solid rounded-lg shadow-lg md:h-16 md:w-12 bg-white`}>
      <div className={`${borderColor} overflow-hidden border border-solid rounded-md size-7 md:size-10`}>
        <Image className='size-full' src='/placeholder/card.png' alt='Icono de publicaciones' width={40} height={40} loader={myLoader} />
      </div>
      <div className={`${bg} w-full h-1`} />
      <div className={`${bg} w-5/6 h-1`} />
    </div>
  )
}
