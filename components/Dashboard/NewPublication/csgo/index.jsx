import styles from './Csgo.module.scss'

import { Formik, Form, Field, ErrorMessage } from 'formik'

const CsgoPublication = ({ toggle, setToggle }) => {
  const initialValues = {
    position: [],
    level: [],
    typeOfGamer: '',
    hours: '',
    description: '',
    uid: ''
  }
  return (
    <section className={styles.csgo} data-open={toggle === 'csgo'}>
      <div className={styles.head}>
        <h2>Counter Strike Global Ofensive</h2>
        <button className={styles.cancel} onClick={() => setToggle(false)}>Cancelar</button>
      </div>
      <section className={styles.newPublication}>
        <h2>Añadir publicación</h2>
        <div className={styles.form}>
          <Formik
            initialValues={initialValues}
            validate={values => {
              const errors = {}
              return errors
            }}
            onSubmit={(values, { setSubmitting }) => {
              console.log(values.position)
              // setTimeout(() => {
              //   setSubmitting(false)
              //   location.reload()
              // }, 400)
            }}
          >
            {({ isSubmitting, values }) => (
              <Form>
                <div className={styles.group}>
                  Posición
                  <div class={styles.position} role='group' aria-labelledby='my-radio-group'>
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
                </div>
                <div className={styles.group}>
                  Level
                  <div class={styles.level} role='group' aria-labelledby='my-radio-group'>
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
                </div>
                <div className={styles.group}>
                  <label className={styles.hours}>
                    Horas jugadas
                    <Field
                      type='number'
                      name='hours'
                    />
                  </label>
                  <ErrorMessage name='hours' component='span' />
                </div>
                <div className={styles.group}>
                  Tipo de jugador
                  <div class={styles.typeOfGamer} role='group' aria-labelledby='my-radio-group'>
                    <label>
                      Competitivo
                      <Field
                        type='radio'
                        name='typeOfGamer'
                        value='Competitivo'
                      />
                    </label>
                    <label>
                      Casual
                      <Field
                        type='radio'
                        name='typeOfGamer'
                        value='Casual'
                      />
                    </label>
                  </div>
                  <ErrorMessage name='typeOfGamer' component='span' />
                </div>
                <div className={styles.group}>
                  <label className={styles.description}>
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

export default CsgoPublication
