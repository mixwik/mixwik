import styles from './Profile.module.scss'

// formik
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { updateUserData } from '../../../firebase/hooks/updateMethod/updateUserData'

// Session
import Image from 'next/image'
import { useState } from 'react'
import { useUpdateDataUser } from '../../../firebase/auth/updateDataUser'
import { useSession } from '../../../firebase/auth/useSession'
import { removeImageDB, setImageDB } from '../../../firebase/storage'
import { DeleteIcon, ImageIcon } from '../../Svg'
import { myLoader } from '../../myLoader'

const Profile = ({ user, mixWikTeams }) => {
  const [previewImage, setPreviewImage] = useState()
  const [imgURL, setImgURL] = useState()
  const [image, setImage] = useState()
  const [progress, setProgress] = useState()
  const [error, updateDataUser] = useUpdateDataUser()
  const currentUser = useSession()

  const handleSetImage = async (e) => {
    const reader = new FileReader()
    setImage(e.target.files[0])
    setImageDB('profile', e.target.files[0], setImgURL, setProgress)
    reader.readAsDataURL(e.target.files[0])
    reader.onload = () => {
      setPreviewImage(reader.result)
    }
  }

  const handleRemoveImage = async (e) => {
    e.preventDefault()
    removeImageDB('profile', image.name)
    setPreviewImage('')
  }

  const initialValues = {
    name: user.name,
    age: user.age,
    gender: user.gender,
    description: user.description || '',
    discord: user.social?.discord || '',
    twitter: user.social?.twitter || '',
    instagram: user.social?.instagram || '',
    facebook: user.social?.facebook || '',
    twitch: user.social?.twitch || '',
    youtube: user.social?.youtube || ''

  }

  const REGEX = {
    discord: /^https?:\/\/discord\.gg\/[a-zA-Z0-9]+$/,
    twitter: /^https?:\/\/(www\.)?twitter\.com\/[a-zA-Z0-9_]+$/,
    instagram: /^https?:\/\/(www\.)?instagram\.com\/[a-zA-Z0-9_]+$/,
    facebook: /^https?:\/\/(www\.)?facebook\.com\/[a-zA-Z0-9_]+$/,
    twitch: /^https?:\/\/(www\.)?twitch\.tv\/[a-zA-Z0-9_]+$/,
    youtube: /^https?:\/\/(www\.)?youtube\.com\/[a-zA-Z0-9_]+$/
  }

  return (
    <section className={styles.profile}>
      <div className={styles.header}>
        <h1 className={styles.title}>Tu perfil</h1>
      </div>
      <section className={styles.information}>
        <p className={styles.paragraph}>Información Pública</p>
        <div className={styles.form}>
          <Formik
            initialValues={initialValues}
            validate={values => {
              const errors = {}
              if (!values.name) errors.name = 'Necesitamos tu nombre o nick'
              if (!values.gender) errors.gender = 'Necesitamos tú genero, tranquilo no será visible para ningún otro usuario'
              if (values.description.length <= 10) errors.description = 'La descripción es muy corta'
              if (values.description.length >= 350) errors.description = 'La descripción es muy larga'
              if (typeof (values.age) !== 'number') errors.age = 'Sólo se admiten números'
              if (values.age < 16) errors.age = 'MixWix es solo para mayores de 16 años'
              if (values.age > 90) errors.age = 'La edad introducida no es válida'
              if (values.discord) {
                if (!REGEX.discord.test(values.discord)) errors.discord = 'El formato de discord no es válido'
              }
              if (values.twitter) {
                if (!REGEX.twitter.test(values.twitter)) errors.twitter = 'El formato de twitter no es válido'
              }
              if (values.instagram) {
                if (!REGEX.instagram.test(values.instagram)) errors.instagram = 'El formato de instagram no es válido'
              }
              if (values.facebook) {
                if (!REGEX.facebook.test(values.facebook)) errors.facebook = 'El formato de facebook no es válido'
              }
              if (values.twitch) {
                if (!REGEX.twitch.test(values.twitch)) errors.twitch = 'El formato de twitch no es válido'
              }
              if (values.youtube) {
                if (!REGEX.youtube.test(values.youtube)) errors.youtube = 'El formato de youtube no es válido'
              }
              return errors
            }}
            onSubmit={(values, { setSubmitting }) => {
              updateUserData(user.id, values, imgURL || user.image)
              updateDataUser(values.name, imgURL || user.image)
              if (!error) {
                setTimeout(() => {
                  setSubmitting(false)
                  location.reload()
                }, 400)
              }
            }}
          >
            {({ isSubmitting, values }) => (
              <Form>
                <div className={styles.image}>
                  <spna className={styles.title}>
                    Cambiar foto:
                  </spna>
                  {
                    error && <div>Ha ocurrido un error</div>
                  }
                  <label>
                    <ImageIcon />
                    <input
                      onChange={handleSetImage}
                      type='file'
                      placeholder='Minutos'
                    />
                    {
                  previewImage
                    ? (
                      <div className={styles.previewImage}>
                        <Image width={0} height={0} loader={myLoader} src={previewImage} alt='precarga' />
                        <button className={styles.deleteImage} onClick={handleRemoveImage}>
                          <DeleteIcon />
                        </button>
                      </div>
                      )
                    : (
                      <div className={styles.previewImage}>
                        <Image width={0} height={0} loader={myLoader} src={currentUser.image} alt='precarga' />
                        <div className={styles.updateImage}>
                          <ImageIcon />
                        </div>
                      </div>
                      )
                }
                  </label>
                  {progress && <div>Subido</div>}
                </div>
                <div className={styles.group}>
                  <label>
                    Nombre:
                    <div>{currentUser.name}</div>
                  </label>
                  <ErrorMessage name='name' component='span' />
                </div>
                <div className={styles.group}>
                  <label>
                    Edad:
                    <div className={styles.hours}>
                      <Field
                        type='range'
                        min='16'
                        max='90'
                        name='age'
                      />
                      {values.age} años
                    </div>
                  </label>
                  <ErrorMessage name='age' component='span' />
                </div>
                <div className={styles.group}>
                  <div className={styles.descriptionBox}>
                    <label className={styles.description}>
                      Descripción:
                      <Field
                        as='textarea' name='description'
                        rows='5'
                        cols='10'
                      />
                    </label>
                    <div className={styles.counter}>{values.description.length > 0 ? values.description.length : 0}/350</div>
                  </div>
                  <ErrorMessage className={styles.error} name='description' component='span' />
                </div>
                <div className={styles.group}>
                  <div className={styles.socialBox}>
                    <label className={styles.social}>
                      Discord:
                      <Field
                        type='text'
                        name='discord'
                      />
                    </label>
                    <label className={styles.social}>
                      Twitter:
                      <Field
                        type='text'
                        name='twitter'
                      />
                    </label>
                    {
                     mixWikTeams && (
                       <>
                         <label className={styles.social}>
                           Youtube:
                           <Field
                             type='text'
                             name='youtube'
                           />
                         </label>
                         <label className={styles.social}>
                           Twitch:
                           <Field
                             type='text'
                             name='twitch'
                           />
                         </label>
                         <label className={styles.social}>
                           Instagram:
                           <Field
                             type='text'
                             name='instagram'
                           />
                         </label>
                         <label className={styles.social}>
                           Facebook:
                           <Field
                             type='text'
                             name='facebook'
                           />
                         </label>
                       </>
                     )
                    }
                  </div>
                  <ErrorMessage className={styles.error} name='twitter' component='span' />
                  <ErrorMessage className={styles.error} name='discord' component='span' />
                  <ErrorMessage className={styles.error} name='instagram' component='span' />
                  <ErrorMessage className={styles.error} name='facebook' component='span' />
                  <ErrorMessage className={styles.error} name='youtube' component='span' />
                  <ErrorMessage className={styles.error} name='twitch' component='span' />
                </div>
                <p className={styles.paragraph}>Información Privada</p>
                <div className={styles.genderBox}>
                  Genero:
                  <div class={styles.gender} role='group' aria-labelledby='my-radio-group'>
                    <Field
                      type='radio'
                      name='gender'
                      value='M'
                      id='M'
                    />
                    <label for='M'>
                      Masculino
                    </label>
                    <Field
                      type='radio'
                      name='gender'
                      value='F'
                      id='F'
                    />
                    <label for='F'>
                      Femenino
                    </label>
                    <Field
                      type='radio'
                      name='gender'
                      value='O'
                      id='O'
                    />
                    <label for='O'>
                      Otro
                    </label>
                  </div>
                  <ErrorMessage name='gender' component='span' />
                </div>
                <button type='submit' disabled={isSubmitting}>
                  Guardar
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </section>
    </section>
  )
}

export default Profile
