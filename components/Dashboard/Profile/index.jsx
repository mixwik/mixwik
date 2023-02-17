import styles from './Profile.module.scss'

// formik
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { updateUserData } from '../../../firebase/hooks/updateMethod/updateUserData'

// Session
import { useSignOut } from '../../../firebase/auth/SignOut'

const Profile = ({ user }) => {
  const handleSignOut = useSignOut()
  const initialValues = {
    name: user.name,
    age: user.age,
    gender: user.gender,
    description: user.description || ''
  }

  return (
    <section className={styles.profile}>
      <div className={styles.header}>
        <h1 className={styles.title}>Tu perfil</h1>
        <button
          className={styles.signOut}
          onClick={() => handleSignOut()}
        >
          Cerrar Sesión
        </button>
      </div>
      <section className={styles.information}>
        <h2>Información Pública</h2>
        <div className={styles.form}>
          <Formik
            initialValues={initialValues}
            validate={values => {
              const errors = {}
              if (values.description.length <= 10) errors.description = 'La descripción es muy corta'
              if (values.description.length >= 350) errors.description = 'La descripción es muy larga'
              if (typeof (values.age) !== 'number') errors.age = 'Sólo se admiten números'
              if (values.age < 16) errors.age = 'MixWix es solo para mayores de 16 años'
              if (values.age > 90) errors.age = 'La edad introducida no es válida'
              return errors
            }}
            onSubmit={(values, { setSubmitting }) => {
              updateUserData(user.id, values)
              setTimeout(() => {
                setSubmitting(false)
                location.reload()
              }, 400)
            }}
          >
            {({ isSubmitting, values }) => (
              <Form>
                <div className={styles.group}>
                  <label>
                    Nombre:
                    <Field
                      type='text'
                      name='name'
                    />
                  </label>
                  <ErrorMessage name='name' component='span' />
                </div>
                <div className={styles.group}>
                  <label>
                    Edad:
                    <Field
                      type='number'
                      name='age'
                    />
                  </label>
                  <ErrorMessage name='age' component='span' />
                </div>
                <div className={styles.group}>
                  <div class={styles.gender} role='group' aria-labelledby='my-radio-group'>
                    <label>
                      Masculino
                      <Field
                        type='radio'
                        name='gender'
                        value='M'
                      />
                    </label>
                    <label>
                      Femenino
                      <Field
                        type='radio'
                        name='gender'
                        value='F'
                      />
                    </label>
                    <label>
                      Otro
                      <Field
                        type='radio'
                        name='gender'
                        value='O'
                      />
                    </label>
                  </div>
                  <ErrorMessage name='gender' component='span' />
                </div>
                <div className={styles.group}>
                  <label>
                    Descripción:
                    <Field
                      as='textarea' name='description'
                      rows='5'
                      cols='10'
                    />
                  </label>
                  <ErrorMessage name='description' component='span' />
                  <div>{values.description.length > 0 ? values.description.length : 0}/350</div>
                </div>
                <button type='submit' disabled={isSubmitting}>
                  Guardar
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </section>
    </section>
  )
}

export default Profile
