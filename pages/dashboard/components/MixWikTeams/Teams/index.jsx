import { useComproveRenovationSubscription } from '../../../../../hooks/useChecksStripe'

const Teams = ({ currentUser, mixWikTeams }) => {
  const [date] = useComproveRenovationSubscription(currentUser.mixWikTeams, mixWikTeams)
  return (
    <section className='flex flex-col items-center h-full md:justify-center'>
      <h2 className='text-2xl font-bold'>Ya eres de MixWikTeams</h2>
      <p className='p-5'>Estas son tús ventajas:</p>
      <ul className='flex flex-col gap-5'>
        <li className='grid grid-cols-[1fr_10fr] place-items-start gap-5 md:gap-0'>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='w-8 h-8 text-green-500'>
            <path fillRule='evenodd' d='M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z' clipRule='evenodd' />
          </svg>
          <div>
            <p className='font-semibold'>
              Podrás publicar hasta 5 anuncios por juego
            </p>
            <p className='text-sm'>
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
            <p className='text-sm'>
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
            <p className='text-sm'>
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
            <p className='text-sm'>
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
              Más enlaces hacia tus redes sociales
            </p>
            <p className='text-sm'>
              Incluyes todas tus redes sociales en tus publicaciones para que los usuarios puedan seguirte.
            </p>
          </div>
        </li>
      </ul>
      <span className='p-3 my-10 font-bold text-white rounded-md md:mb-0 bg-pennBlue'>Fecha de finalización: {date}</span>
    </section>
  )
}

export default Teams
