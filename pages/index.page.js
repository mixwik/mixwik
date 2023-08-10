// Styles
import styles from '../styles/Home.module.scss'

// Components
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { BACKGROUNDS_IMAGES, CITIES_IMAGES } from '../assets/images'
import ButtonGame from '../components/ButtonGame'
import Footer from '../components/Footer'
import Video from '../components/Home-video'
import Layout from '../components/Layout'

// Images

export default function Home () {
  const [city, setCity] = useState('')
  const router = useRouter()
  const handleSubmit = (e) => {
    e.preventDefault()
    if (city === '') {
      alert('Debes introducir una ciudad')
    } else {
      router.push(`/poblacion/${city}`)
    }
  }

  return (
    <Layout title='MixWik'>
      <header className={styles.header}>
        <Video />
        <h1>Encuentra jugadores y equipos cerca de ti</h1>
        <div className='grid grid-cols-2 gap-5 m-10 md:grid-cols-6 md:m-20'>
          <ButtonGame />
        </div>
        <Link href='/todos-los-jugadores' className='p-2 text-xl text-white transition-colors duration-500 rounded-md bg-pennBlue hover:bg-aero '>Buscar a todos los jugadores/teams</Link>
      </header>
      <section className='relative flex flex-col items-center w-[100vw] h-full'>
        <Image src={BACKGROUNDS_IMAGES.backgroundBlue} className='absolute top-0 left-0 object-cover h-full' alt='Imagen de fondo de las ciudades' />
        <h2 className='z-20 p-5 text-xl font-bold text-white md:text-3xl'>Principales Ciudades</h2>
        <div className='md:grid flex flex-col w-full grid-cols-3 gap-5 p-5 md:p-10 h-[80vh]'>
          <Link className='relative flex flex-col col-start-1 col-end-3 overflow-hidden text-center rounded-lg h-80 md:h-full' href='/poblacion/madrid'>
            <h3 className='z-10 p-1 text-xl font-bold text-center text-white md:text-3xl backdrop-blur-sm bg-pennBlue bg-opacity-30'>Málaga</h3>
            <Image src={CITIES_IMAGES.malaga} className='absolute top-0 left-0 object-cover w-full h-full transition-transform duration-500 hover:scale-150' alt='Imagen de fondo de Málaga' />
          </Link>
          <Link className='relative flex flex-col col-start-3 col-end-4 row-start-1 row-end-3 overflow-hidden rounded-lg h-80 md:h-full' href='/poblacion/barcelona'>
            <h3 className='z-10 p-1 text-xl font-bold text-center text-white md:text-3xl backdrop-blur-sm bg-pennBlue bg-opacity-30'>Barcelona</h3>
            <Image src={CITIES_IMAGES.barcelona} className='absolute top-0 left-0 object-cover w-full h-full transition-transform duration-500 hover:scale-150' alt='Imagen de fondo de Barcelona' />
          </Link>
          <Link className='relative flex flex-col overflow-hidden rounded-lg h-80 md:h-full' href='/poblacion/valencia'>
            <h3 className='z-10 p-1 text-xl font-bold text-center text-white md:text-3xl backdrop-blur-sm bg-pennBlue bg-opacity-30'>Valencia</h3>
            <Image src={CITIES_IMAGES.valencia} className='absolute top-0 left-0 object-cover w-full h-full transition-transform duration-500 hover:scale-150' alt='Imagen de fondo de Valencia' />
          </Link>
          <Link className='relative flex flex-col overflow-hidden rounded-lg h-80 md:h-full' href='/poblacion/malaga'>
            <h3 className='z-10 p-1 text-xl font-bold text-center text-white md:text-3xl backdrop-blur-sm bg-pennBlue bg-opacity-30'>Madrid</h3>
            <Image src={CITIES_IMAGES.madrid} className='absolute top-0 left-0 object-cover w-full h-full transition-transform duration-500 hover:scale-150' alt='Imagen de fondo de Madrid' />
          </Link>
        </div>
        <form
          className='z-10 flex justify-center pb-10'
          onSubmit={handleSubmit}
        >
          <input className='px-3 py-2 rounded-l-md md:w-80' type='text' placeholder='Busca tú ciudad' onChange={(e) => setCity(e.target.value)} />
          <button type='submit' className='px-3 font-semibold text-white transition-colors duration-500 bg-aero rounded-r-md md:w-32 hover:bg-pennBlue'>Buscar</button>
        </form>
      </section>
      <Footer />
    </Layout>
  )
}
