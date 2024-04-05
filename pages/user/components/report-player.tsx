import Link from 'next/link'
import { BackgroundDots } from '../../../components/background-dots'

export const ReportPlayer = ({ userServer, setIsOpen }) => {
  return (
    <section className='fixed md:top-[10vh] top-0 h-[90vh] z-20 flex flex-col items-center justify-between w-full'>
      <BackgroundDots />
      <div className='flex flex-col items-center justify-center h-full gap-10 bg-white md:w-1/2'>
        <h2 className='px-5 pt-5 text-xl font-bold text-center md:text-2xl'>Reportar Jugador</h2>
        <p className='px-5'>¿<span className='font-bold'>{userServer.name}</span> ha cometido una infracción o actos reprobables?</p>
        <p className='px-5'>
          Envía un email a{' '}
          <Link
            className='font-semibold text-blue-500' href='mailto:infomixwik@gmail.com'
          >
            infomixwik@gmail.com {' '}
          </Link>
          aportando las pruebas de su mala conducta y valoraremos la sanción pertinente
        </p>
        <button
          className='w-40 p-2 font-bold text-white rounded-md bg-pennBlue'
          onClick={() => setIsOpen(false)}
        >
          Cancelar Reporte
        </button>
      </div>
    </section>
  )
}
