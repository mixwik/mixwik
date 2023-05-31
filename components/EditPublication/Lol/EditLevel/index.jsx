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
              value='Sin Nivel'
              name='level'
              id='sin nivel'
            />
            <label for='sin nivel'>
              Sin Nivel
            </label>
            <Field
              type='radio'
              value='Hierro'
              name='level'
              id='hierro'
            />
            <label for='hierro'>
              Hierro
            </label>
            <Field
              type='radio'
              value='Bronce'
              name='level'
              id='bronce'
            />
            <label for='bronce'>
              Bronce
            </label>
            <Field
              type='radio'
              value='Plata'
              name='level'
              id='plata'
            />
            <label for='plata'>
              Plata
            </label>
            <Field
              type='radio'
              value='Oro'
              name='level'
              id='oro'
            />
            <label for='oro'>
              Oro
            </label>
            <Field
              type='radio'
              value='Platino'
              name='level'
              id='platino'
            />
            <label for='platino'>
              Platino
            </label>
            <Field
              type='radio'
              value='Diamante'
              name='level'
              id='diamante'
            />
            <label for='diamante'>
              Diamante
            </label>
            <Field
              type='radio'
              value='Maestro'
              name='level'
              id='maestro'
            />
            <label for='maestro'>
              Maestro
            </label>
            <Field
              type='radio'
              value='Gran Maestro'
              name='level'
              id='gran maestro'
            />
            <label for='gran maestro'>
              Gran Maestro
            </label>
            <Field
              type='radio'
              value='Retador'
              name='level'
              id='retador'
            />
            <label for='retador'>
              Retador
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
