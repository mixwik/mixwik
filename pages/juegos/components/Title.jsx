import Image from 'next/image'

const TitlePage = ({ title, alt, image }) => {
  return (
    <h1>
      <Image className='h-[6vh]' src={image} alt={alt} />
      <span className='hidden'>{title}</span>
    </h1>
  )
}

export default TitlePage
