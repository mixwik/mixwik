import { ErrorMessage, Field, Form, Formik } from 'formik'
import { updatePublicationHours } from '../../../firebase/hooks/updateMethod/updateUserData'
import styles from './EditHours.module.scss'

const EditHours = ({ category, id, hours, setEdit }) => {
  return (
    <Formik
      initialValues={{
        hours
      }}
      validate={(values) => {
        const errors = {}
        if (values.hours.length <= 0) errors.hours = 'No puede estar vacío'
        return errors
      }}
      onSubmit={(values) => {
        updatePublicationHours(category, id, values.hours)
        setTimeout(() => {
          location.reload()
        }, 400)
      }}
    >
      {({ values, errors }) => (
        <Form className={styles.editHours}>
          <h2>Horas Jugadas:</h2>
          <div className={styles.hours}>
            <Field
              type='range'
              name='hours'
              value={values.hours}
              min='0'
              max='10000'
              step='50'
            />
            {values.hours}h
          </div>
          <ErrorMessage name='hours' component='span' />
          <div className={styles.buttons}>
            <button
              type='submit'
              disabled={errors.hours}
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

export default EditHours
