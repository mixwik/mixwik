import Link from 'next/link'
import ButtonGame from './ButtonGame'

export const Hero = () => {
  return (
    <header className='relative md:-top-[10vh] md:h-screen h-[90vh] flex justify-center items-center'>
      <div className='absolute z-50 flex flex-col items-center h-full gap-20 md:justify-center'>
        <div className='text-3xl font-bold text-center md:text-5xl'>
          <h1 className='p-5 text-transparent bg-clip-text bg-gradient-to-r from-aero to-white'>
            Encuentra jugadores y equipos cerca de ti
          </h1>
        </div>
        <div className='grid grid-cols-3 gap-5 md:grid-cols-6 '>
          <ButtonGame />
        </div>
        <Link href='/todos-los-jugadores' className='px-1 py-3 text-xl text-white transition-colors duration-500 rounded-md md:px-5 bg-pennBlue hover:bg-aero '>Buscar a todos los jugadores/teams</Link>
      </div>
      <div className='relative size-full'>
        <video autoPlay loop muted className='absolute top-0 z-10 h-full' style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 50% 100%, 0 85%)' }}>
          <source src={require('../public/sports2.webm')} type='video/webm' />
        </video>
        <video autoPlay loop muted className='absolute top-0 h-full blur-2xl'>
          <source src={require('../public/sports2.webm')} type='video/webm' />
        </video>
      </div>
    </header>
  )
}
