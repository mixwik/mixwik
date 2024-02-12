import Image from 'next/image'
import { myLoader } from '../../../components/myLoader'

const TitlePage = ({ title, alt, image }) => {
  return (
    <h1 className='flex justify-center h-10 p-1 md:h-20 md:p-2'>
      <Image className='object-cover w-auto h-full' loader={myLoader} width={80} height={100} src={image} alt={alt} />
      <span className='sr-only'>{title}</span>
    </h1>
  )
}

export default TitlePage
