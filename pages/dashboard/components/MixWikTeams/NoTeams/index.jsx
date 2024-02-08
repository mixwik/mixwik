import Image from 'next/image'
import Link from 'next/link'
import logo from '../../../../../public/logos/mixwik-logo.png'

const NoTeams = ({ currentUser }) => {
  return (
    <div className='flex flex-col items-center justify-center h-full'>
      <div className='flex items-center bg-pennBlue'>
        <section className='bg-white'>
          <h1 className='text-4xl font-bold text-center'>MixWik Teams</h1>
          <p className='p-5 text-center'>Hazte de MixWik Teams donando 5€ y obtendrás las siguientes ventajas:</p>
          <ul className='flex flex-col gap-5'>
            <li className='grid grid-cols-[1fr_10fr] place-items-start gap-5 md:gap-0'>
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='w-8 h-8 text-green-500'>
                <path fillRule='evenodd' d='M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z' clipRule='evenodd' />
              </svg>
              <div>
                <p className='font-semibold'>
                  Podrás publicar hasta 5 anuncios por juego
                </p>
                <p className='text-xs'>
                  Con Teams tendrás la oportunidad de crear hasta 5 anuncios por juego, lo cuál es perfecto si tienes más de un perfil de jugador en tu juego favorito y quieres crear una publicación para cada perfil.
                </p>
              </div>
            </li>
            <li className='grid grid-cols-[1fr_10fr] place-items-start gap-5 md:gap-0'>
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='w-8 h-8 text-green-500'>
                <path fillRule='evenodd' d='M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z' clipRule='evenodd' />
              </svg>
              <div>
                <p className='font-semibold'>
                  Pon hasta 7 imágenes en tus publicaciones
                </p>
                <p className='text-xs'>
                  Tienes muchas capturas de grandes jugadas y no sabes cual publicar, con Teams podrás publicar hasta 7 imágenes en cada publicación.
                </p>
              </div>
            </li>
            <li className='grid grid-cols-[1fr_10fr] place-items-start gap-5 md:gap-0'>
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='w-8 h-8 text-green-500'>
                <path fillRule='evenodd' d='M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z' clipRule='evenodd' />
              </svg>
              <div>
                <p className='font-semibold'>
                  Crea equipos y reúne jugadores para llegar a lo más alto
                </p>
                <p className='text-xs'>
                  Con la opción de publicar Team podrás crear equipos y seleccionando que posiciones necesitas así que si buscas jugadores competitivos o más casual para solo echar un buen rato.
                </p>
              </div>
            </li>
            <li className='grid grid-cols-[1fr_10fr] place-items-start gap-5 md:gap-0'>
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='w-8 h-8 text-green-500'>
                <path fillRule='evenodd' d='M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z' clipRule='evenodd' />
              </svg>
              <div>
                <p className='font-semibold'>
                  Incluye tu canal de Twitch y/o Youtube en tus publicaciones
                </p>
                <p className='text-xs'>
                  Al ser de MixWikTeams podrás incluir tu canal de Twitch y/o Youtube en tus publicaciones para que los usuarios puedan ver tus directos y/o vídeos.
                </p>
              </div>
            </li>
            <li className='grid grid-cols-[1fr_10fr] place-items-start gap-5 md:gap-0'>
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='w-8 h-8 text-green-500'>
                <path fillRule='evenodd' d='M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z' clipRule='evenodd' />
              </svg>
              <div>
                <p className='font-semibold'>
                  No se auto-renueva
                </p>
                <p className='text-xs'>
                  Ten la tranquilidad de que una vez llegue la fecha de finalización de la suscripción no se renovará automáticamente, por lo que no tendrás que preocuparte de que se te cobre sin querer.
                </p>
              </div>
            </li>
          </ul>
        </section>
        <Image className='hidden object-cover w-auto h-20 md:flex' src={logo} alt='logo de MixWik' />
      </div>
      <Link className='p-3 mt-5 text-xl font-bold text-white transition-colors duration-500 rounded-md bg-aero hover:bg-pennBlue' href={`https://buy.stripe.com/bIY9BEdGg7KA66QdQQ?prefilled_email=${currentUser.email}&client_reference_id=${currentUser.uid}`}>Donar</Link>
    </div>
  )
}

export default NoTeams
