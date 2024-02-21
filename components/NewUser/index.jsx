// styles
import Image from 'next/image'
// import { useSession } from '../../firebase/auth/useSession'
import Layout from '../Layout'

const NewUser = () => {
  // const { userProvider } = useSession()

  const createUser = async () => {

  }

  return (
    <Layout>
      <section className='flex items-center justify-center h-[90vh]'>
        <div className='fixed inset-0 -z-10 h-full w-full bg-slate-100 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]' />
        <div className='flex flex-col justify-around w-full h-full p-5 bg-white md:h-4/5 md:w-1/2'>
          <h1 className='flex flex-col items-center justify-center gap-3 text-4xl font-bold'>Bienvenido a <span className='sr-only'>MixWik</span> <Image className='w-auto h-12' alt='Logo de Mixwik' src='/logos/mixwik-logo.png' width={100} height={50} /></h1>
          <ol className='relative m-5 border-gray-200 border-s'>
            <li className='mb-10 ms-6'>
              <span className='absolute flex items-center justify-center w-6 h-6 rounded-full bg-aero -start-3 ring-8 ring-white'>
                <svg className='w-2.5 h-2.5 text-pennBlue' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 20 20'>
                  <path d='M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z' />
                </svg>
              </span>
              <p className='mb-4 font-normal text-gray-500 text-pretty'>Estamos muy felices de tenerte en nuestra comunidad, en MixWik podrás encontrar jugadores cerca de tí y formar equipo para lograr la victoria 🏆</p>
            </li>
            <li className='mb-10 ms-6'>
              <span className='absolute flex items-center justify-center w-6 h-6 rounded-full bg-aero -start-3 ring-8 ring-white '>
                <svg className='w-2.5 h-2.5 text-pennBlue ' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 20 20'>
                  <path d='M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z' />
                </svg>
              </span>
              <p className='font-normal text-gray-500 text-pretty'>Además podrás publicar anuncios para encontrar jugadores para tú equipo o para unirte a otros equipos que busquen jugadores como tú.</p>
            </li>
            <li className='ms-6'>
              <span className='absolute flex items-center justify-center w-6 h-6 rounded-full bg-aero -start-3 ring-8 ring-white'>
                <svg className='w-2.5 h-2.5 text-pennBlue ' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 20 20'>
                  <path d='M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z' />
                </svg>
              </span>
              <p className='font-normal text-gray-500 text-pretty '>Pero antes de poder comenzar a publicar anuncios necesitamos saber de tí, por favor rellena los siguientes datos:</p>
            </li>
          </ol>
          <button onClick={createUser} className='w-full py-3 text-white transition duration-500 ease-in-out transform shadow-xl bg-pennBlue rounded-xl hover:shadow-inner focus:outline-none hover:-translate-x hover:scale-105'>Comenzar</button>
        </div>
      </section>
    </Layout>
  )
}

export default NewUser
