import Image from 'next/image'
import { removeImageDB, setImageDB } from '../../firebase/storage'
import { myLoader } from '../myLoader'
import { DeleteIcon, ImageIcon } from '../Svg'
import styles from './EditPublication.module.scss'

export const EditImages = ({ currentUser }) => {
  const [imageError, setImageError] = useState()
  const [previewImage, setPreviewImage] = useState()
  const [previewImage2, setPreviewImage2] = useState()
  const [previewImage3, setPreviewImage3] = useState()
  const [previewImage4, setPreviewImage4] = useState()
  const [previewImage5, setPreviewImage5] = useState()
  const [previewImage6, setPreviewImage6] = useState()
  const [previewImage7, setPreviewImage7] = useState()
  const [imgURL, setImgURL] = useState()
  const [imgURL2, setImgURL2] = useState()
  const [imgURL3, setImgURL3] = useState()
  const [imgURL4, setImgURL4] = useState()
  const [imgURL5, setImgURL5] = useState()
  const [imgURL6, setImgURL6] = useState()
  const [imgURL7, setImgURL7] = useState()
  const [image, setImage] = useState('')
  const [image2, setImage2] = useState('')
  const [image3, setImage3] = useState('')
  const [image4, setImage4] = useState('')
  const [image5, setImage5] = useState('')
  const [image6, setImage6] = useState('')
  const [image7, setImage7] = useState('')
  const [progress, setProgress] = useState()

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

  const handleRemoveImage = async (e, images, setPreviewImages, setImages) => {
    e.preventDefault()
    removeImageDB(currentUser.uid, images.name)
    setPreviewImages('')
    setImages('')
  }
  return (
    <div className={styles.editImages}>
      <h1>EditImages</h1>
      <article className={styles.teams}>
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
              <button onClick={(e) => handleRemoveImage(e, image, setPreviewImage, setImage)}>
                <DeleteIcon />
              </button>
            </div>
          )}
        </label>
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
              <button onClick={(e) => handleRemoveImage(e, image2, setPreviewImage2, setImage2)}>
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
              <button onClick={(e) => handleRemoveImage(e, image3, setPreviewImage3, setImage3)}>
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
              <button onClick={(e) => handleRemoveImage(e, image4, setPreviewImage4, setImage4)}>
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
              <button onClick={(e) => handleRemoveImage(e, image5, setPreviewImage5, setImage5)}>
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
              <button onClick={(e) => handleRemoveImage(e, image6, setPreviewImage6, setImage6)}>
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
              <button onClick={(e) => handleRemoveImage(e, image7, setPreviewImage7, setImage7)}>
                <DeleteIcon />
              </button>
            </div>
          )}
        </label>
      </article>
    </div>
  )
}
