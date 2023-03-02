import styles from './FormUserData.module.scss'

// formik
import { useCurrentPosition } from '../../../hooks/useCurrentPosition'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { setNewUser } from '../../../firebase/hooks/setMethod/setNewUser'
import { useSession } from '../../../firebase/auth/useSession'
import { removeImageDB, setImageDB } from '../../../firebase/storage'
import { useState } from 'react'
import { DeleteIcon, ImageIcon } from '../../Svg'
import { myLoader } from '../../myLoader'
import Image from 'next/image'

const FormUserData = ({ method }) => {
  const [previewImage, setPreviewImage] = useState()
  const [imgURL, setImgURL] = useState()
  const [image, setImage] = useState()
  const [progress, setProgress] = useState()
  const currentPosition = useCurrentPosition()

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

  const user = useSession()
  const initialValues = {
    name: '',
    age: '',
    gender: '',
    description: '',
    geometry: [],
    uid: '',
    profileImg: '',
    email: ''
  }
  return (
    <div className={styles.form}>
      <Formik
        initialValues={initialValues}
        validate={values => {
          const errors = {}
          if (!values.name) errors.name = 'Necesitamos tu nombre o nick'
          if (!values.age) errors.age = 'Necesitamos saber tu edad'
          if (!values.gender) errors.gender = 'Necesitamos tú genero, tranquilo no será visible para ningún otro usuario'
          if (values.description.length <= 10) errors.description = 'La descripción es muy corta'
          if (values.description.length >= 350) errors.description = 'La descripción es muy larga'
          if (typeof (values.age) !== 'number') errors.age = 'Sólo se admiten números'
          if (values.age < 16) errors.age = 'MixWix es solo para mayores de 16 años'
          if (values.age > 90) errors.age = 'La edad introducida no es válida'
          return errors
        }}
        onSubmit={(values, { setSubmitting }) => {
          setNewUser(values, currentPosition, user, imgURL)
          setTimeout(() => {
            setSubmitting(false)
            location.reload()
          }, 400)
        }}
      >
        {({ isSubmitting, values }) => (
          <Form>
            <article className={styles.image}>
              <h3>Cambia tu foto de perfil</h3>
              <label>
                <ImageIcon />
                <input
                  onChange={handleSetImage}
                  type='file'
                  placeholder='Minutos'
                />
                {previewImage && (
                  <div className={styles.previewImage}>
                    <Image width={0} height={0} loader={myLoader} src={previewImage} alt='precarga' />
                    <button onClick={handleRemoveImage}>
                      <DeleteIcon />
                    </button>
                  </div>
                )}
              </label>
            </article>
            <div className={styles.group}>
              <label>
                Nombre:
                <Field type='text' name='name' />
              </label>
              <ErrorMessage name='name' component='span' />
              <div>El nombre que indiques será el que se muestre al resto de usuarios, puedes poner tú nombre real o un nick si lo prefieres, pero no se permiten nombres ofensivos 🤨.</div>
            </div>
            <div className={styles.group}>
              <label>
                Edad:
                <Field type='number' name='age' />
              </label>
              <ErrorMessage name='age' component='span' />
              <div>Solicitamos tú edad para que puedas encontrar otros usuarios con edad parecida a la tuya, en caso de que así lo desees.</div>
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
              <div>Para MixWik la igualdad es lo primero, así que por lo tanto nunca se mostrará tú genero a otras personas y nadie podrá filtrar usuarios por este campo</div>
            </div>
            <div className={styles.group}>
              <label>
                Descripción:
                <Field as='textarea' name='description' rows='5' cols='10' />
              </label>
              <ErrorMessage name='description' component='span' />
              <div>{values.description.length > 0 ? values.description.length : 0}/350</div>
              <div>Haz una breve descripción sobre ti, máximo 350 caracteres (opcional)</div>
            </div>
            <button
              type='submit'
              disabled={!progress || isSubmitting}
            >
              Guardar
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default FormUserData
