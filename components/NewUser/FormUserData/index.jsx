import styles from './FormUserData.module.scss'

// formik
import { useCurrentPosition } from '../../../hooks/useCurrentPosition'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { setNewUser } from '../../../firebase/hooks/setMethod/setNewUser'
import { useSession } from '../../../firebase/auth/useSession'

const FormUserData = ({ method }) => {
  const currentPosition = useCurrentPosition()
  const user = useSession()
  const initialValues = {
    name: '',
    age: '',
    gender: '',
    description: '',
    geometry: [],
    uid: ''
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
          setNewUser(values.name, values.age, values.gender, values.description, currentPosition, user.uid)
          setTimeout(() => {
            setSubmitting(false)
            location.reload()
          }, 400)
        }}
      >
        {({ isSubmitting, values }) => (
          <Form>
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
              <div class={styles.gender} role='group' aria-labelledby='my-radio-group'>
                <label>
                  Masculino
                  <Field type='radio' name='gender' value='M' />
                </label>
                <label>
                  Femenino
                  <Field type='radio' name='gender' value='F' />
                </label>
                <label>
                  Otro
                  <Field type='radio' name='gender' value='O' />
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
            <button type='submit' disabled={isSubmitting}>
              Guardar
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default FormUserData
