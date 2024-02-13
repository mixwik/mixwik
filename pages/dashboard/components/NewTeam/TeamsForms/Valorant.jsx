import { Field, Form, Formik } from 'formik'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { DeleteIcon, ImageIcon } from '../../../../../components/Svg'
import { myLoader } from '../../../../../components/myLoader'
import { COLLECTIONS } from '../../../../../domain/constants'
import { setTeam } from '../../../../../firebase/hooks/setMethod/setTeam'
import { updateDiscord, updateUserNumberPublications } from '../../../../../firebase/hooks/updateMethod/updateUserData'
import { removeImageDB, setImageDB } from '../../../../../firebase/storage'
import { useCurrentPosition } from '../../../../../hooks/useCurrentPosition'
import styles from './NewTeamForm.module.scss'

const Valorant = ({ currentUser, setToggle, toggle }) => {
  const router = useRouter()
  const currentPosition = useCurrentPosition()
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
  const initialValues = {
    position: [],
    level: [],
    typeOfGamer: [],
    hours: 0,
    title: '',
    description: '',
    uid: '',
    geometry: [],
    age: 16,
    discord: currentUser.social.discord
  }
  return (
    <section className={styles.formBox} data-active={toggle === COLLECTIONS.valorant}>
      <h2 className={styles.titleForm}>Valorant</h2>
      <Formik
        initialValues={initialValues}
        validate={values => {
          const errors = {}
          if (!values.title) {
            errors.title = 'Requerido'
          } else if (values.title.length > 50) {
            errors.title = 'El título debe tener menos de 50 caracteres'
          }
          if (!values.description) {
            errors.description = 'Requerido'
          } else if (values.description.length > 350) {
            errors.description = 'La descripción debe tener menos de 350 caracteres'
          }
          if (values.position.length === 0) {
            errors.position = 'Requerido'
          }
          if (values.level.length === 0) {
            errors.level = 'Requerido'
          }
          if (values.typeOfGamer.length === 0) {
            errors.typeOfGamer = 'Requerido'
          }
          if (values.hours === 0) {
            errors.hours = 'Requerido'
          }
          if (values.age < 16) {
            errors.age = 'Debes ser mayor de 16 años'
          }
          if (!/^https?:\/\/discord\.gg\/[a-zA-Z0-9]+$/.test(values.discord)) {
            errors.discord = 'El formato del discord no es válido'
          } else if (!values.discord) {
            errors.discord = 'Requerido'
          }
          return errors
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTeam(COLLECTIONS.valorant, values, currentPosition, currentUser, imgURL, image.name, imgURL2, image2.name, imgURL3, image3.name, imgURL4, image4.name, imgURL5, image5.name, imgURL6, image6.name, imgURL7, image7.name)
          updateUserNumberPublications(COLLECTIONS.valorant, currentUser.id, 1)
          updateDiscord(currentUser.id, values.discord, currentUser.social)
          setTimeout(() => {
            setSubmitting(false)
            router.push('/dashboard?page=myPublications')
          }, 500)
        }}
      >
        {({ isSubmitting, values }) => (
          <Form className={styles.form}>
            <div className={styles.titleAndDescription}>
              <label className={styles.titlePublication}>
                <Field className={styles.title} type='text' name='title' placeholder='Título...' />
              </label>
              <label className={styles.descriptionPublication}>
                <Field
                  className={styles.description}
                  as='textarea'
                  name='description'
                  placeholder='Descripción...'
                  rows='10'
                  cols='20'
                />
                <div>
                  {values.description.length > 0 ? values.description.length : 0}/350
                </div>
              </label>
              <label className={styles.socialPublication}>
                Añade tu Discord
                <Field className={styles.social} type='text' name='discord' placeholder='Discord...' />
              </label>
            </div>
            <div className={styles.position}>
              <div className={styles.title}>¿Que posiciones buscas?</div>
              <div class={styles.inputBox} role='group' aria-labelledby='my-checkbox-group'>
                <Field
                  type='checkbox'
                  value='Iniciador'
                  name='position'
                  id='iniciador'
                />
                <label for='iniciador'>
                  Iniciador
                </label>
                <Field
                  type='checkbox'
                  value='Duelista'
                  name='position'
                  id='duelista'
                />
                <label for='duelista'>
                  Duelista
                </label>
                <Field
                  type='checkbox'
                  value='Centinelas'
                  name='position'
                  id='centinelas'
                />
                <label for='centinelas'>
                  Centinelas
                </label>
                <Field
                  type='checkbox'
                  value='Controlador'
                  name='position'
                  id='controlador'
                />
                <label for='controlador'>
                  Controlador
                </label>
              </div>
            </div>
            <div className={styles.level}>
              <div className={styles.title}>¿Que niveles buscas?</div>
              <div class={styles.inputBox} role='group' aria-labelledby='my-checkbox-group'>
                <Field
                  type='checkbox'
                  value='Hierro'
                  name='level'
                  id='hierroV'
                />
                <label for='hierroV'>
                  Hierro
                </label>
                <Field
                  type='checkbox'
                  value='Bronce'
                  name='level'
                  id='bronceV'
                />
                <label for='bronceV'>
                  Bronce
                </label>
                <Field
                  type='checkbox'
                  value='Plata'
                  name='level'
                  id='plataV'
                />
                <label for='plataV'>
                  Plata
                </label>
                <Field
                  type='checkbox'
                  value='Oro'
                  name='level'
                  id='oroV'
                />
                <label for='oroV'>
                  Oro
                </label>
                <Field
                  type='checkbox'
                  value='Platino'
                  name='level'
                  id='platinoV'
                />
                <label for='platinoV'>
                  Platino
                </label>
                <Field
                  type='checkbox'
                  value='Diamante'
                  name='level'
                  id='diamanteV'
                />
                <label for='diamanteV'>
                  Diamante
                </label>
                <Field
                  type='checkbox'
                  value='Immortal'
                  name='level'
                  id='immortalV'
                />
                <label for='immortalV'>
                  Immortal
                </label>
                <Field
                  type='checkbox'
                  value='Valorant'
                  name='level'
                  id='valorantV'
                />
                <label for='valorantV'>
                  Valorant
                </label>
              </div>
            </div>
            <div className={styles.hoursTypeOfGamerAge}>
              <label className={styles.hours}>
                Horas de juego mínimas
                <Field
                  type='range'
                  name='hours'
                  value={values.hours}
                  min='0'
                  max='10000'
                  step='50'
                />
                {values.hours}h
              </label>
              <label className={styles.age}>
                Edad mínima
                <Field
                  type='range'
                  name='age'
                  value={values.age}
                  min='16'
                  max='90'
                  step='1'
                />
                {values.age} años
              </label>
              <div className={styles.typeOfGamer}>
                <div className={styles.title}>¿Que tipo de jugador buscas?</div>
                <div class={styles.inputBox} role='group' aria-labelledby='my-checkbox-group'>
                  <Field
                    type='checkbox'
                    name='typeOfGamer'
                    value='Competitivo'
                    id='competitivoV'
                  />
                  <label for='competitivoV'>
                    Competitivo
                  </label>
                  <Field
                    type='checkbox'
                    name='typeOfGamer'
                    value='Casual'
                    id='casualV'
                  />
                  <label for='casualV'>
                    Casual
                  </label>
                </div>
              </div>
            </div>
            <article className={styles.image}>
              <div className={styles.title}>
                Añade tus imágenes
              </div>
              {imageError}
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
              <article className={styles.teams}>
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
            </article>
            <div className={styles.buttons}>
              <button
                className={styles.submit}
                type='submit'
                disabled={
                      values.hours === 0 ||
                      values.title.length === 0 ||
                      values.description.length === 0 ||
                      values.level.length === 0 ||
                      values.position.length === 0 ||
                      values.typeOfGamer.length === 0 ||
                      values.discord.length === 0 ||
                      !progress ||
                      isSubmitting
                    }
              >
                Publicar
              </button>
              <button className={styles.cancel} type='button' onClick={() => setToggle('nav')}>Cancelar</button>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  )
}

export default Valorant
