import { ErrorMessage, Field, Form, Formik } from 'formik'
import { updatePublicationAge } from '../../../firebase/hooks/updateMethod/updateUserData'
import styles from './EditAge.module.scss'

const EditAge = ({ category, id, age, setEdit }) => {
  return (
    <Formik
      initialValues={{
        age
      }}
      validate={(values) => {
        const errors = {}
        if (values.age.length <= 0) errors.age = 'No puede estar vacío'
        return errors
      }}
      onSubmit={(values) => {
        updatePublicationAge(category, id, values.age)
        setTimeout(() => {
          location.reload()
        }, 400)
      }}
    >
      {({ values, errors }) => (
        <Form className={styles.editAge}>
          <h2>Edad:</h2>
          <div className={styles.age}>
            <Field
              type='range'
              name='age'
              value={values.hours}
              min='16'
              max='90'
              step='1'
            />
            {values.age} años
          </div>
          <ErrorMessage name='age' component='span' />
          <div className={styles.buttons}>
            <button
              type='submit'
              disabled={errors.age}
            >
              Guardar
            </button>
            <button
              onClick={() => setEdit(false)}
            >
              Cancelar
            </button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default EditAge
