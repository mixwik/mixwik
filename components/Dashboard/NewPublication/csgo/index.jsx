import styles from './Csgo.module.scss'

import { Formik, Form, Field, ErrorMessage } from 'formik'
import { setCsgo } from '../../../../firebase/hooks/setMethod/setCsgo'
import { useState } from 'react'
import { removeImageDB, setImageDB } from '../../../../firebase/storage'
import Image from 'next/image'
import { myLoader } from '../../../myLoader'
import { DeleteIcon, ImageIcon } from '../../../Svg'
import { updateUserCsgoPublications } from '../../../../firebase/hooks/updateMethod/updateUserData'
import Link from 'next/link'

const CsgoPublication = ({ toggle, currentUser, teams }) => {
  const [imageError, setImageError] = useState()
  const [previewImage, setPreviewImage] = useState()
  const [previewImage2, setPreviewImage2] = useState()
  const [previewImage3, setPreviewImage3] = useState()
  const [previewImage4, setPreviewImage4] = useState()
  const [previewImage5, setPreviewImage5] = useState()
  const [previewImage6, setPreviewImage6] = useState()
  const [imgURL, setImgURL] = useState()
  const [imgURL2, setImgURL2] = useState()
  const [imgURL3, setImgURL3] = useState()
  const [imgURL4, setImgURL4] = useState()
  const [imgURL5, setImgURL5] = useState()
  const [imgURL6, setImgURL6] = useState()
  const [image, setImage] = useState('')
  const [image2, setImage2] = useState('')
  const [image3, setImage3] = useState('')
  const [image4, setImage4] = useState('')
  const [image5, setImage5] = useState('')
  const [image6, setImage6] = useState('')
  const [progress, setProgress] = useState()

  const handleSetImage = async (e, setImages, setImgsURL, setPreviewImages) => {
    const reader = new FileReader()
    setImages(e.target.files[0])
    if (
      e.target.files[0].name !== image.name &&
      e.target.files[0].name !== image2.name &&
      e.target.files[0].name !== image3.name &&
      e.target.files[0].name !== image4.name &&
      e.target.files[0].name !== image5.name &&
      e.target.files[0].name !== image6.name
    ) {
      setImageDB('csgo', e.target.files[0], setImgsURL, setProgress)
      reader.readAsDataURL(e.target.files[0])
      reader.onload = () => {
        setPreviewImages(reader.result)
      }
    } else {
      setImageError('No subas la misma imagen dos veces')
      setTimeout(() => setImageError(''), 2000)
    }
  }

  const handleRemoveImage = async (e, images, setPreviewImages, setImages) => {
    e.preventDefault()
    removeImageDB('csgo', images.name)
    setPreviewImages('')
    setImages('')
  }
  const initialValues = {
    position: [],
    level: [],
    typeOfGamer: [],
    hours: '',
    description: '',
    uid: '',
    geometry: [],
    age: ''
  }
  return (
    <section className={styles.csgo} data-open={toggle === 'csgo'}>
      <section className={styles.newPublication}>
        <h2 className={styles.title}>Counter Strike Global Ofensive</h2>
        <div className={styles.form}>
          <Formik
            initialValues={initialValues}
            validate={values => {
              const errors = {}
              return errors
            }}
            onSubmit={(values, { setSubmitting }) => {
              setCsgo(values, currentUser, imgURL, imgURL2, imgURL3, imgURL4, imgURL5, imgURL6)
              updateUserCsgoPublications(currentUser.id)
              setTimeout(() => {
                setSubmitting(false)
                location.reload()
              }, 400)
            }}
          >
            {({ isSubmitting, values }) => (
              <Form>
                <article className={styles.position}>
                  <h3 className={styles.title}>¿En que posición te gusta jugar?</h3>
                  <div class={styles.inputBox} role='group' aria-labelledby='my-radio-group'>
                    <Field
                      type='checkbox'
                      value='Entry fragger'
                      name='position'
                      id='entry'
                    />
                    <label for='entry'>
                      Entry Fragger
                    </label>
                    <Field
                      type='checkbox'
                      value='In-game leader'
                      name='position'
                      id='in-game'
                    />
                    <label for='in-game'>
                      In-game leader
                    </label>
                    <Field
                      type='checkbox'
                      value='AWPer'
                      name='position'
                      id='awper'
                    />
                    <label for='awper'>
                      AWPer
                    </label>
                    <Field
                      type='checkbox'
                      value='Lurker'
                      name='position'
                      id='lurker'
                    />
                    <label for='lurker'>
                      Lurker
                    </label>
                    <Field
                      type='checkbox'
                      value='Playmaker'
                      name='position'
                      id='playmaker'
                    />
                    <label for='playmaker'>
                      Playmaker
                    </label>
                    <Field
                      type='checkbox'
                      value='Support'
                      name='position'
                      id='support'
                    />
                    <label for='support'>
                      Support
                    </label>
                    <Field
                      type='checkbox'
                      value='Entrenador'
                      name='position'
                      id='entrenador'
                    />
                    <label for='entrenador'>
                      Entrenador
                    </label>
                    <Field
                      type='checkbox'
                      value='Secondary AWPer'
                      name='position'
                      id='secondary-awper'
                    />
                    <label for='secondary-awper'>
                      Secondary AWPer
                    </label>
                  </div>
                  <ErrorMessage name='position' component='span' />
                </article>
                <article className={styles.level}>
                  <h3 className={styles.title}>¿Cuál es tu nivel?</h3>
                  <div class={styles.inputBox} role='group' aria-labelledby='my-radio-group'>
                    <Field
                      type='radio'
                      value='Silver'
                      name='level'
                      id='silver'
                    />
                    <label for='silver'>
                      Silver
                    </label>
                    <Field
                      type='radio'
                      value='Nova'
                      name='level'
                      id='nova'
                    />
                    <label for='nova'>
                      Nova
                    </label>
                    <Field
                      type='radio'
                      value='Ak'
                      name='level'
                      id='ak'
                    />
                    <label for='ak'>
                      Ak
                    </label>
                    <Field
                      type='radio'
                      value='Ak laurel'
                      name='level'
                      id='ak-laurel'
                    />
                    <label for='ak-laurel'>
                      Ak Laurel
                    </label>
                    <Field
                      type='radio'
                      value='Doble ak'
                      name='level'
                      id='doble-ak'
                    />
                    <label for='doble-ak'>
                      Doble Ak
                    </label>
                    <Field
                      type='radio'
                      value='Chapa'
                      name='level'
                      id='chapa'
                    />
                    <label for='chapa'>
                      Chapa
                    </label>
                    <Field
                      type='radio'
                      value='Aguila'
                      name='level'
                      id='aguila'
                    />
                    <label for='aguila'>
                      Aguila
                    </label>
                    <Field
                      type='radio'
                      value='Aguila laurel'
                      name='level'
                      id='aguil-laurel'
                    />
                    <label for='aguil-laurel'>
                      Aguila Laurel
                    </label>
                    <Field
                      type='radio'
                      value='Supreme'
                      name='level'
                      id='supreme'
                    />
                    <label for='supreme'>
                      Supreme
                    </label>
                    <Field
                      type='radio'
                      value='Global elite'
                      name='level'
                      id='global-elite'
                    />
                    <label for='global-elite'>
                      Global Elite
                    </label>
                  </div>
                  <ErrorMessage name='level' component='span' />
                </article>
                <article className={styles.hoursAndType}>
                  <article className={styles.hours}>
                    <h3>Horas jugadas</h3>
                    <Field
                      type='number'
                      name='hours'
                    />
                    <ErrorMessage name='hours' component='span' />
                  </article>
                  <article className={styles.typeOfGamer}>
                    <h3>¿Que tipo de jugador te consideras?</h3>
                    <div class={styles.inputBox} role='group' aria-labelledby='my-radio-group'>
                      <Field
                        type='checkbox'
                        name='typeOfGamer'
                        value='Competitivo'
                        id='competitivo'
                      />
                      <label for='competitivo'>
                        Competitivo
                      </label>
                      <Field
                        type='checkbox'
                        name='typeOfGamer'
                        value='Casual'
                        id='casual'
                      />
                      <label for='casual'>
                        Casual
                      </label>
                    </div>
                    <ErrorMessage name='typeOfGamer' component='span' />
                  </article>
                </article>
                <article className={styles.description}>
                  <h3>Describete como jugador de CSGO</h3>
                  <Field
                    as='textarea' name='description'
                    rows='5'
                    cols='10'
                  />
                  <ErrorMessage name='description' component='span' />
                  <div>
                    {values.description.length > 0 ? values.description.length : 0}/350
                  </div>
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
                      </article>
                    )
                  }
                  {
                    !teams && (
                      <article className={styles.noTeams}>
                        <h3>Con mixWikTeams añade hasta 5 imágenes <Link href={`https://buy.stripe.com/test_aEU2aN1Mb0vl2tO3cg?prefilled_email=${currentUser.email}&client_reference_id=${currentUser.uid}`}>Suscríbete</Link></h3>
                        <div>
                          <span><ImageIcon /></span>
                          <span><ImageIcon /></span>
                          <span><ImageIcon /></span>
                          <span><ImageIcon /></span>
                          <span><ImageIcon /></span>
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
                      values.hours === '' ||
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
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </section>
    </section>
  )
}

export default CsgoPublication
