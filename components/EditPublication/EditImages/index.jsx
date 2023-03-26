import Image from 'next/image'
import { useState } from 'react'
import { updatePublicationImages } from '../../../firebase/hooks/updateMethod/updateUserData'
import { removeImageDB, setImageDB } from '../../../firebase/storage'
import { myLoader } from '../../myLoader'
import { DeleteIcon, ImageIcon } from '../../Svg'
import styles from './EditPublication.module.scss'

export const EditImages = ({ category, id, currentUser, prevImg, prevImg2, prevImg3, prevImg4, prevImg5, prevImg6, prevImg7, setEdit, mixWikTeams }) => {
  const [imageError, setImageError] = useState()
  const [previewImage, setPreviewImage] = useState(prevImg.url)
  const [previewImage2, setPreviewImage2] = useState(prevImg2.url)
  const [previewImage3, setPreviewImage3] = useState(prevImg3.url)
  const [previewImage4, setPreviewImage4] = useState(prevImg4.url)
  const [previewImage5, setPreviewImage5] = useState(prevImg5.url)
  const [previewImage6, setPreviewImage6] = useState(prevImg6.url)
  const [previewImage7, setPreviewImage7] = useState(prevImg7.url)
  const [imgURL, setImgURL] = useState(prevImg.url)
  const [imgURL2, setImgURL2] = useState(prevImg2.url)
  const [imgURL3, setImgURL3] = useState(prevImg3.url)
  const [imgURL4, setImgURL4] = useState(prevImg4.url)
  const [imgURL5, setImgURL5] = useState(prevImg5.url)
  const [imgURL6, setImgURL6] = useState(prevImg6.url)
  const [imgURL7, setImgURL7] = useState(prevImg7.url)
  const [image, setImage] = useState(prevImg.name || '')
  const [image2, setImage2] = useState(prevImg2.name || '')
  const [image3, setImage3] = useState(prevImg3.name || '')
  const [image4, setImage4] = useState(prevImg4.name || '')
  const [image5, setImage5] = useState(prevImg5.name || '')
  const [image6, setImage6] = useState(prevImg6.name || '')
  const [image7, setImage7] = useState(prevImg7.name || '')
  const [progress, setProgress] = useState(false)
  const handleSetImage = async (e, setImages, setImgsURL, setPreviewImages) => {
    const reader = new FileReader()
    setImages(e.target.files[0])

    if (
      e.target.files[0].type === 'image/jpg' ||
      e.target.files[0].type === 'image/jpeg' ||
      e.target.files[0].type === 'image/webp' ||
      e.target.files[0].type === 'image/png'
    ) {
      if (
        e.target.files[0].name !== image.name &&
      e.target.files[0].name !== image2.name &&
      e.target.files[0].name !== image3.name &&
      e.target.files[0].name !== image4.name &&
      e.target.files[0].name !== image5.name &&
      e.target.files[0].name !== image6.name &&
      e.target.files[0].name !== image7.name
      ) {
        setImageDB(currentUser.uid, e.target.files[0], setImgsURL, setProgress)
        reader.readAsDataURL(e.target.files[0])
        reader.onload = () => {
          setPreviewImages(reader.result)
        }
      } else {
        setImageError('No subas la misma imagen dos veces')
        setTimeout(() => setImageError(''), 2000)
      }
    } else {
      setImageError('El formato de la imagen no es válido')
      setTimeout(() => setImageError(''), 2000)
    }
  }

  const handleRemoveImage = async (e, images, setPreviewImages, setImages, setImgsURL) => {
    e.preventDefault()
    removeImageDB(currentUser.uid, images.name || images)
    setPreviewImages('')
    setImages('')
    setImgsURL('')
    setProgress(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    updatePublicationImages(category, id, imgURL, image.name || image, imgURL2, image2.name || image2, imgURL3, image3.name || image3, imgURL4, image4.name || image4, imgURL5, image5.name || image5, imgURL6, image6.name || image6, imgURL7, image7.name || image7)
    setTimeout(() => setEdit(false), 2000)
  }

  return (
    <article className={styles.editImages}>
      <label className={styles.principalImage}>
        <ImageIcon />
        <input
          onChange={(e) => handleSetImage(e, setImage, setImgURL, setPreviewImage)}
          type='file'
          placeholder='Minutos'
        />
        {previewImage && (
          <div className={styles.previewImage}>
            <Image width={0} height={0} loader={myLoader} src={previewImage} alt='precarga' />
            <button onClick={(e) => handleRemoveImage(e, image, setPreviewImage, setImage, setImgURL)}>
              <DeleteIcon />
            </button>
          </div>
        )}
      </label>
      {
          mixWikTeams
            ? (
              <div className={styles.teams}>
                <label className={styles.principalImage}>
                  <ImageIcon />
                  <input
                    onChange={(e) => handleSetImage(e, setImage2, setImgURL2, setPreviewImage2)}
                    type='file'
                    placeholder='Minutos'
                  />
                  {previewImage2 && (
                    <div className={styles.previewImage}>
                      <Image width={0} height={0} loader={myLoader} src={previewImage2} alt='precarga' />
                      <button onClick={(e) => handleRemoveImage(e, image2, setPreviewImage2, setImage2, setImgURL2)}>
                        <DeleteIcon />
                      </button>
                    </div>
                  )}
                </label>
                <label className={styles.principalImage}>
                  <ImageIcon />
                  <input
                    onChange={(e) => handleSetImage(e, setImage3, setImgURL3, setPreviewImage3)}
                    type='file'
                    placeholder='Minutos'
                  />
                  {previewImage3 && (
                    <div className={styles.previewImage}>
                      <Image width={0} height={0} loader={myLoader} src={previewImage3} alt='precarga' />
                      <button onClick={(e) => handleRemoveImage(e, image3, setPreviewImage3, setImage3, setImgURL3)}>
                        <DeleteIcon />
                      </button>
                    </div>
                  )}
                </label>
                <label className={styles.principalImage}>
                  <ImageIcon />
                  <input
                    onChange={(e) => handleSetImage(e, setImage4, setImgURL4, setPreviewImage4)}
                    type='file'
                    placeholder='Minutos'
                  />
                  {previewImage4 && (
                    <div className={styles.previewImage}>
                      <Image width={0} height={0} loader={myLoader} src={previewImage4} alt='precarga' />
                      <button onClick={(e) => handleRemoveImage(e, image4, setPreviewImage4, setImage4, setImgURL4)}>
                        <DeleteIcon />
                      </button>
                    </div>
                  )}
                </label>
                <label className={styles.principalImage}>
                  <ImageIcon />
                  <input
                    onChange={(e) => handleSetImage(e, setImage5, setImgURL5, setPreviewImage5)}
                    type='file'
                    placeholder='Minutos'
                  />
                  {previewImage5 && (
                    <div className={styles.previewImage}>
                      <Image width={0} height={0} loader={myLoader} src={previewImage5} alt='precarga' />
                      <button onClick={(e) => handleRemoveImage(e, image5, setPreviewImage5, setImage5, setImgURL5)}>
                        <DeleteIcon />
                      </button>
                    </div>
                  )}
                </label>
                <label className={styles.principalImage}>
                  <ImageIcon />
                  <input
                    onChange={(e) => handleSetImage(e, setImage6, setImgURL6, setPreviewImage6)}
                    type='file'
                    placeholder='Minutos'
                  />
                  {previewImage6 && (
                    <div className={styles.previewImage}>
                      <Image width={0} height={0} loader={myLoader} src={previewImage6} alt='precarga' />
                      <button onClick={(e) => handleRemoveImage(e, image6, setPreviewImage6, setImage6, setImgURL6)}>
                        <DeleteIcon />
                      </button>
                    </div>
                  )}
                </label>
                <label className={styles.principalImage}>
                  <ImageIcon />
                  <input
                    onChange={(e) => handleSetImage(e, setImage7, setImgURL7, setPreviewImage7)}
                    type='file'
                    placeholder='Minutos'
                  />
                  {previewImage7 && (
                    <div className={styles.previewImage}>
                      <Image width={0} height={0} loader={myLoader} src={previewImage7} alt='precarga' />
                      <button onClick={(e) => handleRemoveImage(e, image7, setPreviewImage7, setImage7, setImgURL7)}>
                        <DeleteIcon />
                      </button>
                    </div>
                  )}
                </label>
              </div>
              )
            : (
              <div className={styles.noTeams}>
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
              )
        }
      <div className={styles.buttons}>
        <button disabled={!progress} onClick={handleSubmit}>Guardar</button>
        <button onClick={() => setEdit(false)}>Cancelar</button>
      </div>
      {imageError && <p className={styles.error}>{imageError}</p>}
    </article>
  )
}
