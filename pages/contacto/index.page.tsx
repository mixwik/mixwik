import emailjs from '@emailjs/browser'
import Link from 'next/link'
import { useRef, useState } from 'react'
import Layout from '../../components/Layout'
import { EmailIcon, WhatsAppIcon } from '../../components/Svg'
import { BackgroundDots } from '../../components/background-dots'

const Contact = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const validateForm = () => {
    const form = formRef.current

    if (!form) {
      return false
    }

    const email = form.email.value
    const name = form.userName.value
    const subject = form.subject.value
    const message = form.message.value

    if (!email || !name || !subject || !message) {
      setError('Todos los campos son obligatorios')
      return false
    }

    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
    if (!emailRegex.test(email)) {
      setError('El email no es válido')
      return false
    }

    return true
  }

  const sendEmail = (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)

    if (formRef.current) {
      emailjs.sendForm('service_2j6pfo8', 'template_uy6v29o', formRef.current, {
        publicKey: 'Nd1_dBZIwAuFeukZf'
      })
        .then(
          () => {
            setSuccess(true)
            setLoading(false)
          },
          (error) => {
            setError(error.text)
            setLoading(false)
          }
        )
    }
  }

  return (
    <Layout title='Contacto / MixWik'>
      <section className='flex items-center justify-center w-screen md:h-[39rem] h-auto'>
        <BackgroundDots />
        <div className='flex flex-col w-full p-5 md:rounded-lg bg-pennBlue md:flex-row md:w-3/4 md:p-0'>
          <div className='w-full bg-white rounded-lg md:rounded-r-none md:w-1/2'>
            <iframe className='p-5 h-4/5' src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3197.0247300426527!2d-3.5216166853983655!3d36.74597747845105!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd7190bde0bb84af%3A0x42164032e985e94c!2sPl.%20Javier%20de%20Burgos%2C%2018600%20Motril%2C%20Granada!5e0!3m2!1ses!2ses!4v1680923375238!5m2!1ses!2ses' loading='lazy' />
            <div className='flex py-5 text-xl font-bold justify-evenly'>
              <Link className='flex items-center gap-2' target='_black' href='https://wa.me/+34722615614'>
                <WhatsAppIcon className='size-6' />
                WhatsApp
              </Link>
              <Link className='flex items-center gap-2' href='mailto:infoMixwik@gmail.com'>
                <EmailIcon className='size-6' />
                Email
              </Link>
            </div>
          </div>
          <form ref={formRef} onSubmit={sendEmail} className='relative flex flex-col w-full h-full gap-5 p-5 mb-10 md:w-1/2'>
            <h1 className='text-3xl font-bold text-center text-white'>Contacto</h1>
            <div className='relative'>
              <div className='absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none'>
                <svg className='w-4 h-4 text-gray-500' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 20 16'>
                  <path d='m10.036 8.278 6.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z' />
                  <path d='M11.241 6.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z' />
                </svg>
              </div>
              <input name='email' type='email' id='input-group-1' className=' border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5' placeholder='name@email.com' required />
            </div>
            <div className='flex'>
              <span className='inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-gray-300 rounded-e-0 rounded-s-md'>
                <svg className='w-4 h-4 text-gray-500' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 20 20'>
                  <path d='M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 6 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z' />
                </svg>
              </span>
              <input name='userName' type='text' id='website-admin' className='rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5' placeholder='Manuel...' required />
            </div>
            <input className='rounded-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 min-w-0 w-full text-sm border-gray-300 p-2.5' type='text' name='subject' placeholder='Asunto:' required />
            <textarea className='rounded-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 min-w-0 w-full text-sm border-gray-300 p-2.5 resize-none' name='message' rows={5} placeholder='Mensaje:' required />
            <button className={`py-3 font-bold text-white rounded-lg ${loading ? 'bg-orange' : success ? 'bg-green-500' : error ? 'bg-red-500' : 'bg-aero'}`}>
              {loading ? 'Enviando mensaje..' : success ? 'Mensaje enviado' : error ? 'Error al enviar el mensaje' : 'Enviar mensaje'}
            </button>
          </form>
        </div>
      </section>
    </Layout>
  )
}

export default Contact
