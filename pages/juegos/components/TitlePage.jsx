import Image from 'next/image'
import { myLoader } from '../../../components/myLoader'

const TitlePage = ({ title, alt, image }) => {
  return (
    <h1 className='flex justify-center h-20 p-1 md:p-2'>
      <Image className='object-cover w-auto h-full' loader={myLoader} width={80} height={100} src={image} alt={alt} />
      <span className='hidden'>{title}</span>
    </h1>
  )
}

export default TitlePage
