import { ErrorMessage, Field, Form, Formik } from 'formik'
import { updatePublicationCsgoPosition } from '../../../../../firebase/hooks/updateMethod/updateUserData'
import styles from './EditPosition.module.scss'

const EditCs2Position = ({ category, id, position, setEdit }) => {
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
              value='Entry fragger'
              name='position'
              id='entry'
            />
            <label for='entry'>
              Entry Fragger
            </label>
            <Field
              type='checkbox'
              value='In-game leader'
              name='position'
              id='in-game'
            />
            <label for='in-game'>
              In-game leader
            </label>
            <Field
              type='checkbox'
              value='AWPer'
              name='position'
              id='awper'
            />
            <label for='awper'>
              AWPer
            </label>
            <Field
              type='checkbox'
              value='Lurker'
              name='position'
              id='lurker'
            />
            <label for='lurker'>
              Lurker
            </label>
            <Field
              type='checkbox'
              value='Playmaker'
              name='position'
              id='playmaker'
            />
            <label for='playmaker'>
              Playmaker
            </label>
            <Field
              type='checkbox'
              value='Support'
              name='position'
              id='support'
            />
            <label for='support'>
              Support
            </label>
            <Field
              type='checkbox'
              value='Entrenador'
              name='position'
              id='entrenador'
            />
            <label for='entrenador'>
              Entrenador
            </label>
            <Field
              type='checkbox'
              value='Secondary AWPer'
              name='position'
              id='secondary-awper'
            />
            <label for='secondary-awper'>
              Secondary AWPer
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

export default EditCs2Position
