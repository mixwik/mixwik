import Layout from '../../components/Layout'
import styles from './Contact.module.scss'

const Contact = () => {
  return (
    <Layout>
      <section className={styles.contact}>
        <div className={styles.formBox}>
          <h1 className={styles.title}>Contáctanos</h1>
          <form className={styles.form}>
            <div>
              <input type='text' placeholder='Nombre:' />
              <input type='text' placeholder='Correo electrónico:' />
            </div>
            <input type='text' placeholder='Asunto:' />
            <textarea rows='10' placeholder='Mensaje:' />
            <button>Enviar mensaje</button>
          </form>
          <div className={styles.contactData}>
            <span>Plaza Javier de Burgos. Motril Granada</span>
            <span>infoMixwik@gmail.com</span>
            <span>722-615-614</span>
          </div>
        </div>
        <video className={styles.video} autoPlay loop muted>
          <source src={(require('../../public/fondo-contact.mp4'))} type='video/mp4' />
        </video>
      </section>
    </Layout>
  )
}

export default Contact
