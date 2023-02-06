// styles
import Layout from '../Layout'
import styles from './NewUser.module.scss'

// formik
import { Formik, Form, Field, ErrorMessage } from 'formik'

const NewUser = () => {
  const initialValues = {
    name: '',
    age: '',
    gender: '',
    geometry: []
  }
  return (
    <Layout>
      <section className={styles.newUser}>
        <h1 className={styles.title}>Bienvenido a MixWik</h1>
        <p>Estamos muy felices de tenerte en nuestra comunidad, en MixWik podrás encontrar jugadores cerca de tí y formar equipo para lograr la victoria 🏆</p>
        <p>Pero antes de poder comenzar a publicar anuncios necesitamos saber de tí, por favor rellena los siguientes datos:</p>

        <Formik
          initialValues={initialValues}
          validate={values => {
            const errors = {}
            if (!values.name) {
              errors.name = 'Campo obligatorio'
            }
            return errors
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2))
              setSubmitting(false)
            }, 400)
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field type='text' name='name' />
              <ErrorMessage name='name' component='div' />
              <Field type='password' name='password' />
              <ErrorMessage name='password' component='div' />
              <button type='submit' disabled={isSubmitting}>
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </section>
    </Layout>
  )
}

export default NewUser
