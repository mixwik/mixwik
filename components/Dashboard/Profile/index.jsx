import styles from './Profile.module.scss'

// formik
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { updateUserData } from '../../../firebase/hooks/updateMethod/updateUserData'

// Session
import Image from 'next/image'
import { useState } from 'react'
import { useSignOut } from '../../../firebase/auth/SignOut'
import { useUpdateDataUser } from '../../../firebase/auth/updateDataUser'
import { useSession } from '../../../firebase/auth/useSession'
import { removeImageDB, setImageDB } from '../../../firebase/storage'
import { myLoader } from '../../myLoader'
import { DeleteIcon, ImageIcon } from '../../Svg'

const Profile = ({ user }) => {
  const handleSignOut = useSignOut()
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
    description: user.description || ''
  }

  return (
    <section className={styles.profile}>
      <div className={styles.header}>
        <h1 className={styles.title}>Tu perfil</h1>
        <button
          className={styles.signOut}
          onClick={() => handleSignOut()}
        >
          Cerrar Sesión
        </button>
      </div>
      <section className={styles.information}>
        <h2>Información Pública</h2>
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
              return errors
            }}
            onSubmit={(values, { setSubmitting }) => {
              updateUserData(user.id, values)
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
                <article className={styles.image}>
                  <h3>Cambia tu foto de perfil</h3>
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
                </article>
                <div className={styles.group}>
                  <label>
                    Nombre:
                    <Field
                      type='text'
                      name='name'
                    />
                  </label>
                  <ErrorMessage name='name' component='span' />
                </div>
                <div className={styles.group}>
                  <label>
                    Edad:
                    <Field
                      type='number'
                      name='age'
                    />
                  </label>
                  <ErrorMessage name='age' component='span' />
                </div>
                <div className={styles.group}>
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
                <div className={styles.group}>
                  <label className={styles.description}>
                    Descripción:
                    <Field
                      as='textarea' name='description'
                      rows='5'
                      cols='10'
                    />
                  </label>
                  <ErrorMessage name='description' component='span' />
                  <div>{values.description.length > 0 ? values.description.length : 0}/350</div>
                </div>
                <button type='submit' disabled={!progress || isSubmitting}>
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
