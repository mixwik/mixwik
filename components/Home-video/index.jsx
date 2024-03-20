import Link from 'next/link'
import ButtonGame from '../ButtonGame'

const HomeVideo = () => {
  return (
    <header className='relative md:-top-[10vh] md:h-screen h-[90vh] flex justify-center items-center' style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 50% 100%, 0 85%)' }}>
      <div className='absolute z-50 flex flex-col items-center h-full gap-5 md:justify-center'>
        <div class='md:text-5xl text-3xl font-bold text-center'>
          <h1 class='bg-clip-text text-transparent bg-gradient-to-r from-aero to-white p-5'>
            Encuentra jugadores y equipos cerca de ti
          </h1>
        </div>
        <div className='grid grid-cols-2 gap-5 md:grid-cols-6 '>
          <ButtonGame />
        </div>
        <Link href='/todos-los-jugadores' className='p-1 py-3 text-xl text-white transition-colors duration-500 rounded-md md:p-5 bg-pennBlue hover:bg-aero '>Buscar a todos los jugadores/teams</Link>
      </div>
      <video autoPlay loop muted className='h-full'>
        <source src={require('../../public/sports2.webm')} type='video/webm' />
      </video>
    </header>
  )
}

export default HomeVideo
