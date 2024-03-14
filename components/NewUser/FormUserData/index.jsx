import styles from './FormUserData.module.scss'

// formik
import { ErrorMessage, Field, Form, Formik } from 'formik'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useUpdateDataUser } from '../../../firebase/auth/updateDataUser'
import { useSession } from '../../../firebase/auth/useSession'
import { setNewUser } from '../../../firebase/hooks/setMethod/setNewUser'
import { removeImageDB, setImageDB } from '../../../firebase/storage'
import { useCurrentPosition } from '../../../hooks/useCurrentPosition'
import { DeleteIcon, ImageIcon } from '../../Svg'
import { myLoader } from '../../myLoader'

const FormUserData = () => {
  const router = useRouter()
  const [previewImage, setPreviewImage] = useState()
  const [imgURL, setImgURL] = useState()
  const [image, setImage] = useState()
  const [, setProgress] = useState(true)
  const { currentPosition } = useCurrentPosition()
  const [, updateDataUser] = useUpdateDataUser()
  const { userProvider } = useSession()

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
    name: '',
    age: '',
    gender: '',
    description: '',
    geometry: [],
    uid: '',
    profileImg: ''
  }
  return (
    <Formik
      initialValues={initialValues}
      validate={values => {
        const errors = {}
        if (!values.name) errors.name = 'Necesitamos tu nombre o nick'
        if (!values.age) errors.age = 'Necesitamos saber tu edad'
        if (!values.gender) errors.gender = 'Necesitamos tú genero, tranquilo no será visible para ningún otro usuario'
        if (typeof (values.age) !== 'number') errors.age = 'Sólo se admiten números'
        if (values.age < 16) errors.age = 'MixWix es solo para mayores de 16 años'
        if (values.age > 90) errors.age = 'La edad introducida no es válida'
        return errors
      }}
      onSubmit={(values, { setSubmitting }) => {
        setNewUser(values, currentPosition, userProvider, imgURL || userProvider?.image)
        updateDataUser(values.name || userProvider?.name, imgURL || userProvider?.image)
        setTimeout(() => {
          setSubmitting(false)
          router.push('/')
        }, 400)
      }}
    >
      {({ isSubmitting, values, errors }) => (
        <Form>
          <section className='bg-red-50'>
            <span className='text-xl font-bold'>Cambia tu foto de perfil</span>
            <label className='flex flex-col items-center justify-center w-32 h-32 bg-white border-2 border-solid rounded-full border-aero'>
              <input
                className='hidden'
                onChange={handleSetImage}
                type='file'
                placeholder='Minutos'
              />
              {
                  previewImage
                    ? (
                      <div className='flex items-center justify-center w-full h-full'>
                        <Image className='object-cover w-full h-full rounded-full' width={0} height={0} loader={myLoader} src={previewImage} alt='Carga de imagen' />
                        <button
                          className='absolute z-20 rounded-full'
                          onClick={handleRemoveImage}
                        >
                          <DeleteIcon className='w-12 h-12 text-red-500' />
                        </button>
                      </div>
                      )
                    : (
                      <div>
                        {
                        userProvider?.image && (<Image width={0} height={0} loader={myLoader} src={userProvider?.image} alt='Carga de imagen' />)
                        }
                        <div>
                          <ImageIcon className='w-12 h-12' />
                        </div>
                      </div>
                      )
                }
            </label>
          </section>
          <section>
            <label className='flex flex-col'>
              <span className='text-xl font-bold'>
                Nombre:
              </span>
              <Field type='text' name='name' />
            </label>
            <ErrorMessage name='name' component='span' />
            <p>El nombre que indiques será el que se muestre al resto de usuarios, puedes poner tú nombre real o un nick si lo prefieres, pero no se permiten nombres ofensivos 🤨. <span>Este campo no se podrá cambiar</span></p>
          </section>
          <div className={styles.group}>
            <label>
              Edad:
              <Field type='number' name='age' />
            </label>
            <ErrorMessage name='age' component='span' />
            <div className={styles.description}>Solicitamos tú edad para que puedas encontrar otros usuarios con edad parecida a la tuya, en caso de que así lo desees.</div>
          </div>
          <div className={styles.group}>
            <div className={styles.genderTitle}>
              Genero:
            </div>
            <div className={styles.gender} role='group' aria-labelledby='my-radio-group'>
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
            <div className={styles.description}>Para MixWik la igualdad es lo primero, así que por lo tanto nunca se mostrará tú genero a otras personas y nadie podrá filtrar usuarios por este campo.</div>
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
            disabled={isSubmitting || errors.age || errors.name || errors.gender}
          >
            Guardar
          </button>
        </Form>
      )}
    </Formik>
  )
}

export default FormUserData
