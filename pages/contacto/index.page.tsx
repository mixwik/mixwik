import emailjs from '@emailjs/browser'
import Link from 'next/link'
import { useRef } from 'react'
import Layout from '../../components/Layout'
import { EmailIcon, WhatsAppIcon } from '../../components/Svg'
import styles from './Contact.module.scss'

const Contact = () => {
  const formRef = useRef(null)

  const sendEmail = (e) => {
    e.preventDefault()
    emailjs.sendForm('service_2j6pfo8', 'template_uy6v29o', formRef.current, {
      publicKey: 'Nd1_dBZIwAuFeukZf'
    })
      .then(
        () => {
          alert('Mensaje enviado correctamente')
        },
        (error) => {
          alert(`Error al enviar el mensaje ${error}`)
        }
      )
  }

  return (
    <Layout title='Email'>
      <section className={styles.contact}>
        <div className={styles.formBox}>
          <div className={styles.contactData}>
            <iframe src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3197.0247300426527!2d-3.5216166853983655!3d36.74597747845105!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd7190bde0bb84af%3A0x42164032e985e94c!2sPl.%20Javier%20de%20Burgos%2C%2018600%20Motril%2C%20Granada!5e0!3m2!1ses!2ses!4v1680923375238!5m2!1ses!2ses' loading='lazy' />
            <div className={styles.contactButtons}>
              <Link target='_black' href='https://wa.me/+34722615614'>
                <WhatsAppIcon />
                WhatsApp
              </Link>
              <Link href='mailto:infoMixwik@gmail.com'>
                <EmailIcon />
                Email
              </Link>
            </div>
          </div>
          <form className={styles.form} ref={formRef} onSubmit={sendEmail}>
            <span className={styles.formTitle}>Contacto</span>
            <input type='text' name='name' placeholder='Nombre:' />
            <input type='text' name='email' placeholder='Correo electrónico:' />
            <input type='text' name='subject' placeholder='Asunto:' />
            <textarea className='resize-none' name='message' rows={5} placeholder='Mensaje:' />
            <button>Enviar mensaje</button>
          </form>
        </div>
      </section>
    </Layout>
  )
}

export default Contact
