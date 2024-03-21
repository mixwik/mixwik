import { ErrorMessage, Field, Form, Formik } from 'formik'
import { updatePublicationCsgoPosition } from '../../../../../firebase/hooks/updateMethod/updateUserData'
import styles from './EditPosition.module.scss'

const EditLolPosition = ({ category, id, position, setEdit }) => {
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
              value='Toplane'
              name='position'
              id='toplane'
            />
            <label for='toplane'>
              Toplane
            </label>
            <Field
              type='checkbox'
              value='Midlane'
              name='position'
              id='midlane'
            />
            <label for='midlane'>
              Midlane
            </label>
            <Field
              type='checkbox'
              value='Jungla'
              name='position'
              id='jungla'
            />
            <label for='jungla'>
              Jungla
            </label>
            <Field
              type='checkbox'
              value='ADC'
              name='position'
              id='adc'
            />
            <label for='adc'>
              ADC
            </label>
            <Field
              type='checkbox'
              value='Support'
              name='position'
              id='supportLol'
            />
            <label for='supportLol'>
              Support
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

export default EditLolPosition
