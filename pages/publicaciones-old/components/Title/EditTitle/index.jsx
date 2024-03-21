import { ErrorMessage, Field, Form, Formik } from 'formik'
import { updatePublicationTitle } from '../../../../../firebase/hooks/updateMethod/updateUserData'
import styles from './EditTitle.module.scss'

const EditTitle = ({ category, id, title, setEdit }) => {
  return (
    <Formik
      initialValues={{
        title
      }}
      validate={(values) => {
        const errors = {}
        if (values.title.length <= 0) errors.title = 'No puede estar vacío'
        if (values.title.length >= 60) errors.title = 'No puede superar los 60 caracteres'
        return errors
      }}
      onSubmit={(values) => {
        updatePublicationTitle(category, id, values.title)
        setTimeout(() => {
          location.reload()
        }, 400)
      }}
    >
      {({ values }) => (
        <Form className={styles.editTitle}>
          <Field type='text' name='title' />
          <ErrorMessage name='title' component='span' />
          <div>{values.title.length > 0 ? values.title.length : 0}/60</div>
          <div className={styles.buttons}>
            <button
              type='submit'
              disabled={
                title === values.title ||
                values.title.length <= 0 ||
                values.title.length >= 60
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

export default EditTitle
