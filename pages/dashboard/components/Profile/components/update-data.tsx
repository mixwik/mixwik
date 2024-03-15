import { useState } from 'react'
import { FieldImage } from './image-field'

export const UpdateData = ({ user }) => {
  const [imgURL, setImgURL] = useState('')
  const [image, setImage] = useState<File>()
  return (
    <section>
      <div>
        <FieldImage
          image={image}
          setImage={setImage}
          setImgURL={setImgURL}
          imgURL={imgURL}
        />
      </div>
    </section>
  )
}
