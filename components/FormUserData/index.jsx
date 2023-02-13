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
          if (!values.name) errors.name = 'Necesitamos tu nombre o nick'
          if (!values.age) errors.age = 'Necesitamos saber tu edad'
          if (!values.gender) errors.gender = 'Necesitamos tú genero, tranquilo no será visible para ningún otro usuario'
          if (typeof (values.age) !== 'number') errors.age = 'Sólo se admiten números'
          if (values.age < 18) errors.age = 'Sólo se permiten mayores de edad'
          if (values.age > 115) errors.age = 'La edad introducida no es válida'
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
            <ErrorMessage name='name' component='span' />
            <div>El nombre que indiques será el que se muestre al resto de usuarios, puedes poner tú nombre real o un nick si lo prefieres, pero no se permiten nombres ofensivos 🤨.</div>
            <label>
              Edad:
              <Field type='number' name='age' />
            </label>
            <ErrorMessage name='age' component='span' />
            <div>Solicitamos tú edad para que puedas encontrar otros usuarios con edad parecida a la tuya, en caso de que así lo desees.</div>
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
