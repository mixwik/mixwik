import { ErrorMessage, Field, Form, Formik } from 'formik'
import { updatePublicationFortnitePreferenceTeam } from '../../../../firebase/hooks/updateMethod/updateUserData'
import styles from './EditPreferenceTeam.module.scss'

const EditPreferenceTeam = ({ category, id, preferenceTeam, setEdit }) => {
  return (
    <Formik
      initialValues={{
        preferenceTeam
      }}
      validate={(values) => {
        const errors = {}
        if (values.preferenceTeam.length <= 0) errors.preferenceTeam = 'No puede estar vacío'
        return errors
      }}
      onSubmit={(values) => {
        updatePublicationFortnitePreferenceTeam(category, id, values.preferenceTeam)
        setTimeout(() => {
          location.reload()
        }, 400)
      }}
    >
      {({ values, errors }) => (
        <Form className={styles.editPreferenceTeam}>
          <h2>Nivel:</h2>
          <div className={styles.preferenceTeam}>
            <Field
              type={category === 'teams' ? 'checkbox' : 'radio'}
              value='2 vs 2'
              name='preferenceTeam'
              id='2vs2'
            />
            <label for='2vs2'>
              2 vs 2
            </label>
            <Field
              type={category === 'teams' ? 'checkbox' : 'radio'}
              value='3 vs 3'
              name='preferenceTeam'
              id='3vs3'
            />
            <label for='3vs3'>
              3 vs 3
            </label>
            <Field
              type={category === 'teams' ? 'checkbox' : 'radio'}
              value='4 vs 4'
              name='preferenceTeam'
              id='4vs4'
            />
            <label for='4vs4'>
              4 vs 4
            </label>
          </div>
          <ErrorMessage name='preferenceTeam' component='span' />
          <div className={styles.buttons}>
            <button
              type='submit'
              disabled={errors.preferenceTeam}
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

export default EditPreferenceTeam
