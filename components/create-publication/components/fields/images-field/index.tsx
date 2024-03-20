import React, { useState } from 'react'
import { useSession } from '../../../../../firebase/auth/useSession'
import { removeImageDB, setImageDB } from '../../../../../firebase/storage'
import { AdditionalImage } from './components/additional-image copy'
import { PrincipalImage } from './components/principal-image'

interface FieldImagesProps {
  setImgURL: React.Dispatch<React.SetStateAction<string>>
  setImage: React.Dispatch<React.SetStateAction<File>>
  image: File | undefined
  imgURL: string
  setImgURL2: React.Dispatch<React.SetStateAction<string>>
  setImage2: React.Dispatch<React.SetStateAction<File>>
  imgURL2: string
  setImgURL3: React.Dispatch<React.SetStateAction<string>>
  setImage3: React.Dispatch<React.SetStateAction<File>>
  imgURL3: string
  setImgURL4: React.Dispatch<React.SetStateAction<string>>
  setImage4: React.Dispatch<React.SetStateAction<File>>
  imgURL4: string
  setImgURL5: React.Dispatch<React.SetStateAction<string>>
  setImage5: React.Dispatch<React.SetStateAction<File>>
  imgURL5: string
  setImgURL6: React.Dispatch<React.SetStateAction<string>>
  setImage6: React.Dispatch<React.SetStateAction<File>>
  imgURL6: string
  setImgURL7: React.Dispatch<React.SetStateAction<string>>
  setImage7: React.Dispatch<React.SetStateAction<File>>
  imgURL7: string
  image2: File | undefined
  image3: File | undefined
  image4: File | undefined
  image5: File | undefined
  image6: File | undefined
  image7: File | undefined
}

export const FieldImages = ({
  setImgURL,
  setImgURL2,
  setImgURL3,
  setImgURL4,
  setImgURL5,
  setImgURL6,
  setImgURL7,
  imgURL,
  imgURL2,
  imgURL3,
  imgURL4,
  imgURL5,
  imgURL6,
  imgURL7,
  setImage,
  setImage2,
  setImage3,
  setImage4,
  setImage5,
  setImage6,
  setImage7,
  image,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7
}: FieldImagesProps) => {
  const { userProvider } = useSession()
  const [previewImage, setPreviewImage] = useState('')
  const [previewImage2, setPreviewImage2] = useState('')
  const [previewImage3, setPreviewImage3] = useState('')
  const [previewImage4, setPreviewImage4] = useState('')
  const [previewImage5, setPreviewImage5] = useState('')
  const [previewImage6, setPreviewImage6] = useState('')
  const [previewImage7, setPreviewImage7] = useState('')

  const [, setProgress] = useState()

  const handleSetImage = async (e, setImgURL, setImage, setPreviewImage) => {
    const reader = new FileReader()
    setImage(e.target.files[0])
    setImageDB(userProvider.uid, e.target.files[0], setImgURL, setProgress)
    reader.readAsDataURL(e.target.files[0])
    reader.onload = () => {
      setPreviewImage(reader.result as string)
    }
  }
  const handleRemoveImage = async (e, setImgURL, setPreviewImage, image) => {
    e.preventDefault()
    const imageName = localStorage.getItem('imageName')
    removeImageDB(userProvider.uid, image?.name || imageName)
    localStorage.removeItem('image')
    localStorage.removeItem('imageName')
    setImgURL('')
    setPreviewImage('')
  }

  return (
    <div className='flex flex-col items-center gap-10'>
      <PrincipalImage
        setImage={setImage}
        setImgURL={setImgURL}
        handleSetImage={handleSetImage}
        previewImage={previewImage}
        setPreviewImage={setPreviewImage}
        handleRemoveImage={handleRemoveImage}
        imgURL={imgURL}
        image={image}
      />
      <div className='flex flex-wrap justify-center gap-5'>
        <AdditionalImage
          setImage={setImage2}
          setImgURL={setImgURL2}
          imgURL={imgURL2}
          setPreviewImage={setPreviewImage2}
          handleSetImage={handleSetImage}
          previewImage={previewImage2}
          handleRemoveImage={handleRemoveImage}
          image={image2}
        />
        <AdditionalImage
          setImage={setImage3}
          setImgURL={setImgURL3}
          imgURL={imgURL3}
          setPreviewImage={setPreviewImage3}
          handleSetImage={handleSetImage}
          previewImage={previewImage3}
          handleRemoveImage={handleRemoveImage}
          image={image3}
        />
        <AdditionalImage
          setImage={setImage4}
          setImgURL={setImgURL4}
          imgURL={imgURL4}
          setPreviewImage={setPreviewImage4}
          handleSetImage={handleSetImage}
          previewImage={previewImage4}
          handleRemoveImage={handleRemoveImage}
          image={image4}
        />
        <AdditionalImage
          setImage={setImage5}
          setImgURL={setImgURL5}
          imgURL={imgURL5}
          setPreviewImage={setPreviewImage5}
          handleSetImage={handleSetImage}
          previewImage={previewImage5}
          handleRemoveImage={handleRemoveImage}
          image={image5}
        />
        <AdditionalImage
          setImage={setImage6}
          setImgURL={setImgURL6}
          imgURL={imgURL6}
          setPreviewImage={setPreviewImage6}
          handleSetImage={handleSetImage}
          previewImage={previewImage6}
          handleRemoveImage={handleRemoveImage}
          image={image6}
        />
        <AdditionalImage
          setImage={setImage7}
          setImgURL={setImgURL7}
          imgURL={imgURL7}
          setPreviewImage={setPreviewImage7}
          handleSetImage={handleSetImage}
          previewImage={previewImage7}
          handleRemoveImage={handleRemoveImage}
          image={image7}
        />
      </div>
    </div>

  )
}
