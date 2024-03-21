import { ErrorMessage, Field, Form, Formik } from 'formik'
import { updatePublicationCsgoPosition } from '../../../../../firebase/hooks/updateMethod/updateUserData'
import styles from './EditPosition.module.scss'

const EditValorantPosition = ({ category, id, position, setEdit }) => {
  return (
    <Formik
      initialValues={{
        position
      }}
      validate={(values) => {
        const errors = {}
        if (values.position.length <= 0) errors.position = 'No puede estar vacío'
        if (JSON.stringify(values.position) === JSON.stringify(position)) errors.position = 'No puede ser igual a la actual'
        return errors
      }}
      onSubmit={(values) => {
        updatePublicationCsgoPosition(category, id, values.position)
        setTimeout(() => {
          location.reload()
        }, 400)
      }}
    >
      {({ values, errors }) => (
        <Form className={styles.editPosition}>
          <h2>Posiciones:</h2>
          <div className={styles.position}>
            <Field
              type='checkbox'
              value='Iniciador'
              name='position'
              id='iniciador'
            />
            <label for='iniciador'>
              Iniciador
            </label>
            <Field
              type='checkbox'
              value='Duelista'
              name='position'
              id='duelista'
            />
            <label for='duelista'>
              Duelista
            </label>
            <Field
              type='checkbox'
              value='Centinelas'
              name='position'
              id='centinelas'
            />
            <label for='centinelas'>
              Centinelas
            </label>
            <Field
              type='checkbox'
              value='Controlador'
              name='position'
              id='controlador'
            />
            <label for='controlador'>
              Controlador
            </label>
          </div>
          <ErrorMessage name='position' component='span' />
          <div className={styles.buttons}>
            <button
              type='submit'
              disabled={errors.position}
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

export default EditValorantPosition
