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
              type={category === 'teams' ? 'checkbox' : 'radio'}
              value='Hierro'
              name='level'
              id='hierro'
            />
            <label for='hierro'>
              Hierro
            </label>
            <Field
              type={category === 'teams' ? 'checkbox' : 'radio'}
              value='Bronce'
              name='level'
              id='bronce'
            />
            <label for='bronce'>
              Bronce
            </label>
            <Field
              type={category === 'teams' ? 'checkbox' : 'radio'}
              value='Plata'
              name='level'
              id='plata'
            />
            <label for='plata'>
              Plata
            </label>
            <Field
              type={category === 'teams' ? 'checkbox' : 'radio'}
              value='Oro'
              name='level'
              id='oro'
            />
            <label for='oro'>
              Oro
            </label>
            <Field
              type={category === 'teams' ? 'checkbox' : 'radio'}
              value='Platino'
              name='level'
              id='platino'
            />
            <label for='platino'>
              Platino
            </label>
            <Field
              type={category === 'teams' ? 'checkbox' : 'radio'}
              value='Diamante'
              name='level'
              id='diamante'
            />
            <label for='diamante'>
              Diamante
            </label>
            <Field
              type={category === 'teams' ? 'checkbox' : 'radio'}
              value='Immortal'
              name='level'
              id='immortal'
            />
            <label for='immortal'>
              Immortal
            </label>
            <Field
              type={category === 'teams' ? 'checkbox' : 'radio'}
              value='Valorant'
              name='level'
              id='valorant'
            />
            <label for='valorant'>
              Valorant
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
