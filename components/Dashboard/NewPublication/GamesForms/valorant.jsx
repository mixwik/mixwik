import styles from './GamesForms.module.scss'

import { ErrorMessage, Field, Form, Formik } from 'formik'
import Image from 'next/image'
import { useState } from 'react'
import { COLLECTIONS } from '../../../../domain/constants'
import { setPublication } from '../../../../firebase/hooks/setMethod/setPublication'
import { updateUserNumberPublications } from '../../../../firebase/hooks/updateMethod/updateUserData'
import { removeImageDB, setImageDB } from '../../../../firebase/storage'
import { DeleteIcon, ImageIcon } from '../../../Svg'
import { myLoader } from '../../../myLoader'

const ValorantPublication = ({ setToggle, toggle, currentUser, teams, setTeams, currentPosition }) => {
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
    age: ''
  }
  return (
    <section className={styles.gamesForms} data-open={toggle === COLLECTIONS.valorant}>
      <section className={styles.newPublication}>
        <h2 className={styles.title}>Valorant</h2>
        <div className={styles.form}>
          <Formik
            initialValues={initialValues}
            validate={values => {
              const errors = {}
              return errors
            }}
            onSubmit={(values, { setSubmitting }) => {
              setPublication(COLLECTIONS.valorant, values, currentPosition, currentUser, imgURL, image.name, imgURL2, image2.name, imgURL3, image3.name, imgURL4, image4.name, imgURL5, image5.name, imgURL6, image6.name, imgURL7, image7.name)
              updateUserNumberPublications(COLLECTIONS.valorant, currentUser.id, 1)
              setTimeout(() => {
                setSubmitting(false)
                location.reload()
              }, 400)
            }}
          >
            {({ isSubmitting, values }) => (
              <Form>
                <article className={styles.descriptionBox}>
                  <label className={styles.titlePublication}>
                    <Field className={styles.title} type='text' name='title' placeholder='Título...' />
                    <ErrorMessage name='title' component='span' />
                  </label>
                  <label className={styles.descriptionPublication}>
                    <Field
                      className={styles.description}
                      as='textarea' name='description'
                      rows='5'
                      cols='10'
                      placeholder='Descripción...'
                    />
                    <ErrorMessage name='description' component='span' />
                    <div>
                      {values.description.length > 0 ? values.description.length : 0}/350
                    </div>
                  </label>
                </article>
                <article className={styles.position}>
                  <h3>¿En que posición te gusta jugar?</h3>
                  <div class={styles.inputBox} role='group' aria-labelledby='my-radio-group'>
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
                  <ErrorMessage name='position' component='span' />
                </article>
                <article className={styles.level}>
                  <h3>¿Cuál es tu nivel?</h3>
                  <div class={styles.inputBox} role='group' aria-labelledby='my-radio-group'>
                    <Field
                      type='radio'
                      value='Hierro'
                      name='level'
                      id='hierroV'
                    />
                    <label for='hierroV'>
                      Hierro
                    </label>
                    <Field
                      type='radio'
                      value='Bronce'
                      name='level'
                      id='bronceV'
                    />
                    <label for='bronceV'>
                      Bronce
                    </label>
                    <Field
                      type='radio'
                      value='Plata'
                      name='level'
                      id='plataV'
                    />
                    <label for='plataV'>
                      Plata
                    </label>
                    <Field
                      type='radio'
                      value='Oro'
                      name='level'
                      id='oroV'
                    />
                    <label for='oroV'>
                      Oro
                    </label>
                    <Field
                      type='radio'
                      value='Platino'
                      name='level'
                      id='platinoV'
                    />
                    <label for='platinoV'>
                      Platino
                    </label>
                    <Field
                      type='radio'
                      value='Diamante'
                      name='level'
                      id='diamanteV'
                    />
                    <label for='diamanteV'>
                      Diamante
                    </label>
                    <Field
                      type='radio'
                      value='Immortal'
                      name='level'
                      id='immortalV'
                    />
                    <label for='immortalV'>
                      Immortal
                    </label>
                    <Field
                      type='radio'
                      value='Valorant'
                      name='level'
                      id='valorantV'
                    />
                    <label for='valorantV'>
                      Valorant
                    </label>
                  </div>
                  <ErrorMessage name='level' component='span' />
                </article>
                <article className={styles.hoursAndType}>
                  <article className={styles.hours}>
                    <h3>Horas jugadas</h3>
                    <Field
                      type='range'
                      name='hours'
                      value={values.hours}
                      min='0'
                      max='10000'
                      step='50'
                    />
                    {values.hours}h
                    <ErrorMessage name='hours' component='span' />
                  </article>
                  <article className={styles.typeOfGamer}>
                    <h3>¿Que tipo de jugador te consideras?</h3>
                    <div class={styles.inputBox} role='group' aria-labelledby='my-radio-group'>
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
                    <ErrorMessage name='typeOfGamer' component='span' />
                  </article>
                </article>
                <article className={styles.image}>
                  <h3>
                    {
                      teams ? 'Añade tus imágenes' : 'Añade una imagen'
                    }
                  </h3>
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
                  {
                    teams && (
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
                    )
                  }
                  {
                    !teams && (
                      <article className={styles.noTeams}>
                        <div>
                          <span onClick={() => setTeams('noMixWikTeams')}><ImageIcon /></span>
                          <span onClick={() => setTeams('noMixWikTeams')}><ImageIcon /></span>
                          <span onClick={() => setTeams('noMixWikTeams')}><ImageIcon /></span>
                          <span onClick={() => setTeams('noMixWikTeams')}><ImageIcon /></span>
                          <span onClick={() => setTeams('noMixWikTeams')}><ImageIcon /></span>
                          <span onClick={() => setTeams('noMixWikTeams')}><ImageIcon /></span>
                        </div>
                      </article>
                    )
                  }
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
                      !progress ||
                      isSubmitting
                    }
                  >
                    Publicar
                  </button>
                  <button className={styles.cancel} type='button' onClick={() => setToggle(false)}>
                    Cancelar
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </section>
    </section>
  )
}

export default ValorantPublication
