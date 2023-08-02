import { ErrorMessage, Field, Form, Formik } from 'formik'
import { updatePublicationTypeOfGamer } from '../../../firebase/hooks/updateMethod/updateUserData'
import styles from './EditTypeOfGamer.module.scss'

const EditTypeOfGamer = ({ category, id, typeOfGamer, setEdit }) => {
  return (
    <Formik
      initialValues={{
        typeOfGamer
      }}
      validate={(values) => {
        const errors = {}
        if (values.typeOfGamer.length <= 0) errors.typeOfGamer = 'No puede estar vacío'
        return errors
      }}
      onSubmit={(values) => {
        updatePublicationTypeOfGamer(category, id, values.typeOfGamer)
        setTimeout(() => {
          location.reload()
        }, 400)
      }}
    >
      {({ values, errors }) => (
        <Form className={styles.editTypeOfGamer}>
          <div className={styles.typeOfGamer}>
            <h2>Tipo de jugador:</h2>
            <Field
              type='checkbox'
              name='typeOfGamer'
              value='Competitivo'
              id='competitivo'
            />
            <label for='competitivo'>
              Competitivo
            </label>
            <Field
              type='checkbox'
              name='typeOfGamer'
              value='Casual'
              id='casual'
            />
            <label for='casual'>
              Casual
            </label>
          </div>
          <ErrorMessage name='typeOfGamer' component='span' />
          <div className={styles.buttons}>
            <button
              type='submit'
              disabled={errors.typeOfGamer}
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

export default EditTypeOfGamer
