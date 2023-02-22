import styles from './Csgo.module.scss'

import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useSession } from '../../../../firebase/auth/useSession'
import { useGetUsers } from '../../../../firebase/hooks/getMethod/useGetUsers'
import { setCsgo } from '../../../../firebase/hooks/setMethod/setCsgo'

const CsgoPublication = ({ toggle, setToggle }) => {
  const user = useSession()
  const users = useGetUsers()
  const currentUser = users.find(find => find.uid === user.uid)
  if (!currentUser) return <div>Loading...</div>
  const initialValues = {
    position: [],
    level: [],
    typeOfGamer: '',
    hours: '',
    description: '',
    uid: '',
    geometry: []
  }
  return (
    <section className={styles.csgo} data-open={toggle === 'csgo'}>
      <section className={styles.newPublication}>
        <h2 className={styles.title}>Counter Strike Global Ofensive</h2>
        <div className={styles.form}>
          <Formik
            initialValues={initialValues}
            validate={values => {
              const errors = {}
              return errors
            }}
            onSubmit={(values, { setSubmitting }) => {
              setCsgo(values, currentUser.uid, currentUser.geometry)
              setTimeout(() => {
                setSubmitting(false)
                location.reload()
              }, 400)
            }}
          >
            {({ isSubmitting, values }) => (
              <Form>
                {/* <button className={styles.cancel} onClick={() => setToggle(false)}>X</button> */}
                <article className={styles.position}>
                  <h3 className={styles.title}>¿En que posición te gusta jugar?</h3>
                  <div class={styles.inputBox} role='group' aria-labelledby='my-radio-group'>
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
                </article>
                <article className={styles.level}>
                  <h3 className={styles.title}>¿Cuál es tu nivel?</h3>
                  <div class={styles.inputBox} role='group' aria-labelledby='my-radio-group'>
                    <Field
                      type='checkbox'
                      value='Silver'
                      name='level'
                      id='silver'
                    />
                    <label for='silver'>
                      Silver
                    </label>
                    <Field
                      type='checkbox'
                      value='Nova'
                      name='level'
                      id='nova'
                    />
                    <label for='nova'>
                      Nova
                    </label>
                    <Field
                      type='checkbox'
                      value='Ak'
                      name='level'
                      id='ak'
                    />
                    <label for='ak'>
                      Ak
                    </label>
                    <Field
                      type='checkbox'
                      value='Ak laurel'
                      name='level'
                      id='ak-laurel'
                    />
                    <label for='ak-laurel'>
                      Ak Laurel
                    </label>
                    <Field
                      type='checkbox'
                      value='Doble ak'
                      name='level'
                      id='doble-ak'
                    />
                    <label for='doble-ak'>
                      Doble Ak
                    </label>
                    <Field
                      type='checkbox'
                      value='Chapa'
                      name='level'
                      id='chapa'
                    />
                    <label for='chapa'>
                      Chapa
                    </label>
                    <Field
                      type='checkbox'
                      value='Aguila'
                      name='level'
                      id='aguila'
                    />
                    <label for='aguila'>
                      Aguila
                    </label>
                    <Field
                      type='checkbox'
                      value='Aguila laurel'
                      name='level'
                      id='aguil-laurel'
                    />
                    <label for='aguil-laurel'>
                      Aguila Laurel
                    </label>
                    <Field
                      type='checkbox'
                      value='Supreme'
                      name='level'
                      id='supreme'
                    />
                    <label for='supreme'>
                      Supreme
                    </label>
                    <Field
                      type='checkbox'
                      value='Global elite'
                      name='level'
                      id='global-elite'
                    />
                    <label for='global-elite'>
                      Global Elite
                    </label>
                  </div>
                  <ErrorMessage name='level' component='span' />
                </article>
                <article className={styles.hoursAndType}>
                  <article className={styles.hours}>
                    <h3>Horas jugadas</h3>
                    <Field
                      type='number'
                      name='hours'
                    />
                    <ErrorMessage name='hours' component='span' />
                  </article>
                  <article className={styles.typeOfGamer}>
                    <h3>¿Que tipo de jugador te consideras?</h3>
                    <div class={styles.inputBox} role='group' aria-labelledby='my-radio-group'>
                      <Field
                        type='radio'
                        name='typeOfGamer'
                        value='Competitivo'
                        id='competitivo'
                      />
                      <label for='competitivo'>
                        Competitivo
                      </label>
                      <Field
                        type='radio'
                        name='typeOfGamer'
                        value='Casual'
                        id='casual'
                      />
                      <label for='casual'>
                        Casual
                      </label>
                    </div>
                    <ErrorMessage name='typeOfGamer' component='span' />
                  </article>
                </article>
                <article className={styles.description}>
                  <h3>Describete como jugador de CSGO</h3>
                  <Field
                    as='textarea' name='description'
                    rows='5'
                    cols='10'
                  />
                  <ErrorMessage name='description' component='span' />
                  <div>
                    {values.description.length > 0 ? values.description.length : 0}/350
                  </div>
                </article>
                <article className={styles.private}>
                  <Field
                    type='text'
                    name='uid'
                    value={currentUser.uid}
                  />
                  <Field
                    type='text'
                    name='geometry'
                    value={currentUser.geometry}
                  />
                </article>
                <div className={styles.buttons}>
                  <button className={styles.submit} type='submit' disabled={isSubmitting}>
                    Publicar
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </section>
    </section>
  )
}

export default CsgoPublication
