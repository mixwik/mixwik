import { ErrorMessage, Field, Form, Formik } from 'formik'
import { updatePublicationDescription } from '../../../../../firebase/hooks/updateMethod/updateUserData'
import styles from './EditDescription.module.scss'

const EditDescription = ({ category, id, description, setEdit }) => {
  return (
    <Formik
      initialValues={{
        description
      }}
      validate={(values) => {
        const errors = {}
        if (values.description.length <= 0) errors.description = 'No puede estar vacío'
        if (values.description.length >= 350) errors.description = 'No puede superar los 350 caracteres'
        return errors
      }}
      onSubmit={(values) => {
        updatePublicationDescription(category, id, values.description)
        setTimeout(() => {
          location.reload()
        }, 400)
      }}
    >
      {({ values }) => (
        <Form className={styles.EditDescription}>
          <Field as='textarea' name='description' rows='3' />
          <ErrorMessage name='description' component='span' />
          <div>{values.description.length > 0 ? values.description.length : 0}/350</div>
          <div className={styles.buttons}>
            <button
              type='submit'
              disabled={
                description === values.description ||
                values.description.length <= 0 ||
                values.description.length >= 350
              }
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

export default EditDescription
