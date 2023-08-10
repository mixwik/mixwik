import Image from 'next/image'

const TitlePage = ({ title, alt, image }) => {
  return (
    <h1 className='py-5'>
      <Image className='w-full h-auto px-2 md:h-[6vh]' src={image} alt={alt} />
      <span className='hidden'>{title}</span>
    </h1>
  )
}

export default TitlePage
