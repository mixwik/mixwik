import styles from './FormUserData.module.scss'

// formik
import { useCurrentPosition } from '../../hooks/useCurrentPosition'
import { Formik, Form, Field, ErrorMessage } from 'formik'

const FormUserData = ({ method }) => {
  const currentPosition = useCurrentPosition()
  const initialValues = {
    name: '',
    age: '',
    gender: '',
    geometry: currentPosition
  }
  return (
    <div className={styles.form}>
      <Formik
        initialValues={initialValues}
        validate={values => {
          const errors = {}
          if (!values.name) {
            errors.name = 'Necesitamos tu nombre o nick'
          } else if (!values.age) {
            errors.age = 'Necesitamos saber tu edad'
          } else if (!values.gender) {
            errors.gender = 'Necesitamos tú genero, tranquilo no será visible para ningún otro usuario'
          }
          return errors
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(values.name)
            setSubmitting(false)
          }, 400)
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <label>
              Nombre:
              <Field type='text' name='name' />
            </label>
            <div>El nombre que indiques será el que se muestre al resto de usuarios, puedes poner tú nombre real o un nick si lo prefieres, pero no se permiten nombres ofensivos 🤨.</div>
            <ErrorMessage name='name' component='span' />
            <label>
              Edad:
              <Field type='number' name='age' />
            </label>
            <div>Solicitamos tú edad para que puedas encontrar otros usuarios con edad parecida a la tuya, en caso de que así lo desees.</div>
            <ErrorMessage name='age' component='span' />
            <label>
              Genero:
              <Field type='text' name='gender' />
            </label>
            <div>Para MixWik la igualdad es lo primero, así que por lo tanto nunca se mostrará tú genero a otras personas y nadie podrá filtrar usuarios por este campo</div>
            <ErrorMessage name='gender' component='span' />
            <button type='submit' disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default FormUserData
