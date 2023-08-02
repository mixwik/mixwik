import { useState } from 'react'
import { Carousel } from 'react-responsive-carousel'
import { EditIcon } from '../../../../components/Svg'
import { myLoader } from '../../../../components/myLoader'
import styles from './Carouse.module.scss'
import { EditImages } from './EditImages'
import Image from 'next/image'

const ImagesCarousel = ({ images, limitedAdministrator, publication, publicationUser, mixWikTeams, id, page }) => {
  const [edit, setEdit] = useState(false)

  return (
    <div className={styles.imgBox}>
      <Carousel
        className={styles.carousel}
        showStatus={false}
      >
        {
                images.map((res, index) => (
                  res !== '' && <Image key={index} loader={myLoader} width={0} height={0} src={res} alt={publicationUser.name} />
                ))
              }
      </Carousel>
      {limitedAdministrator && <button className={styles.editButtonImages} onClick={() => setEdit('images')}><EditIcon /></button>}
      {edit === 'images' && (
        <EditImages
          id={id}
          category={page}
          publicationUser={publicationUser}
          prevImg={publication.img}
          prevImg2={publication.img2}
          prevImg3={publication.img3}
          prevImg4={publication.img4}
          prevImg5={publication.img5}
          prevImg6={publication.img6}
          prevImg7={publication.img7}
          setEdit={setEdit}
          mixWikTeams={mixWikTeams}
        />)}
    </div>
  )
}

export default ImagesCarousel
