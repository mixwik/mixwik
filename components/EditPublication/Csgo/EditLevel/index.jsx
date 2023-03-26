import { ErrorMessage, Field, Form, Formik } from 'formik'
import { updatePublicationCsgoLevel } from '../../../../firebase/hooks/updateMethod/updateUserData'
import styles from './EditLevel.module.scss'

const EditLevel = ({ category, id, level, setEdit }) => {
  return (
    <Formik
      initialValues={{
        level
      }}
      validate={(values) => {
        const errors = {}
        if (values.level.length <= 0) errors.level = 'No puede estar vacío'
        return errors
      }}
      onSubmit={(values) => {
        updatePublicationCsgoLevel(category, id, values.level)
        setTimeout(() => {
          location.reload()
        }, 400)
      }}
    >
      {({ values, errors }) => (
        <Form className={styles.editLevel}>
          <h2>Nivel:</h2>
          <div className={styles.level}>
            <Field
              type='radio'
              value='Silver'
              name='level'
              id='silver'
            />
            <label for='silver'>
              Silver
            </label>
            <Field
              type='radio'
              value='Nova'
              name='level'
              id='nova'
            />
            <label for='nova'>
              Nova
            </label>
            <Field
              type='radio'
              value='Ak'
              name='level'
              id='ak'
            />
            <label for='ak'>
              Ak
            </label>
            <Field
              type='radio'
              value='Ak laurel'
              name='level'
              id='ak-laurel'
            />
            <label for='ak-laurel'>
              Ak Laurel
            </label>
            <Field
              type='radio'
              value='Doble ak'
              name='level'
              id='doble-ak'
            />
            <label for='doble-ak'>
              Doble Ak
            </label>
            <Field
              type='radio'
              value='Chapa'
              name='level'
              id='chapa'
            />
            <label for='chapa'>
              Chapa
            </label>
            <Field
              type='radio'
              value='Aguila'
              name='level'
              id='aguila'
            />
            <label for='aguila'>
              Aguila
            </label>
            <Field
              type='radio'
              value='Aguila laurel'
              name='level'
              id='aguil-laurel'
            />
            <label for='aguil-laurel'>
              Aguila Laurel
            </label>
            <Field
              type='radio'
              value='Supreme'
              name='level'
              id='supreme'
            />
            <label for='supreme'>
              Supreme
            </label>
            <Field
              type='radio'
              value='Global elite'
              name='level'
              id='global-elite'
            />
            <label for='global-elite'>
              Global Elite
            </label>
          </div>
          <ErrorMessage name='level' component='span' />
          <div className={styles.buttons}>
            <button
              type='submit'
              disabled={errors.level}
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

export default EditLevel
