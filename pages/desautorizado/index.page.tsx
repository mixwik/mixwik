import Link from 'next/link'
import Layout from '../../components/Layout'
import { useLogInOpenContext } from '../../context'

const Unauthorized = () => {
  const { setLogInOpen } = useLogInOpenContext()
  return (
    <Layout title='No tienes autorización'>
      <section className='flex items-center justify-center bg-white'>
        <div className='container flex items-center justify-center px-6 py-12 mx-auto h-[90vh]'>
          <div className='flex flex-col items-center max-w-lg mx-auto'>
            <svg xmlns='http://www.w3.org/2000/svg' width='44' height='44' viewBox='0 0 24 24' strokeWidth='1.5' stroke='#ffffff' fill='none' strokeLinecap='round' strokeLinejoin='round'>
              <path stroke='none' d='M0 0h24v24H0z' fill='none' />
              <path d='M4 8v-2a2 2 0 0 1 2 -2h2' />
              <path d='M4 16v2a2 2 0 0 0 2 2h2' />
              <path d='M16 4h2a2 2 0 0 1 2 2v2' />
              <path d='M16 20h2a2 2 0 0 0 2 -2v-2' />
              <path d='M8 11m0 1a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1v3a1 1 0 0 1 -1 1h-6a1 1 0 0 1 -1 -1z' />
              <path d='M10 11v-2a2 2 0 1 1 4 0v2' />
            </svg>
            <h1 className='mt-3 text-2xl font-semibold text-gray-800 md:text-3xl text-pretty'>No puedes acceder a este contenido</h1>
            <p className='mt-4 text-gray-500 text-balance'>Si quieres ver las publicaciones de los usuarios debes de estar registrado en MixWik.com.</p>
            <p className='mt-4 text-left text-gray-500 text-balance'>Regístrate para formar parte de una gran comunidad de jugadores, en MixWik podrás:</p>
            <ul className='mt-4 text-left text-gray-500'>
              <li>Publicar tus propias publicaciones.</li>
              <li>Encontrar jugadores cercanos.</li>
              <li>Guarda tus jugadores favoritos.</li>
              <li>Crear y buscar equipos para llegar a lo más alto en tu juego favorito.</li>
              <li>Y mucho más...</li>
            </ul>
            <div className='flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto'>
              <Link href='/' className='flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto hover:bg-gray-100'>
                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='w-5 h-5 rtl:rotate-180'>
                  <path strokeLinecap='round' strokeLinejoin='round' d='M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18' />
                </svg>
                Volver Inicio
              </Link>

              <button onClick={() => setLogInOpen(true)} className='w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto hover:bg-blue-600'>
                Registrarse
              </button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Unauthorized
