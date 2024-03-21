import Image from 'next/image'
import { Carousel } from 'react-responsive-carousel'
import { myLoader } from '../../../../components/myLoader'
import styles from './Carouse.module.scss'

interface ImagesCarouselProps {
  images: { url: string, name: string }[]
}

export const ImagesCarousel = ({ images }: ImagesCarouselProps) => {
  return (
    <div className={styles.imgBox}>
      <Carousel
        className={styles.carousel}
        showStatus={false}
      >
        {
          images
            .filter(image => image?.url !== '')
            .map((image, index) => (
              <Image key={index} loader={myLoader} width={0} height={0} src={image.url} alt={image.name} />
            ))
        }
      </Carousel>
    </div>
  )
}
