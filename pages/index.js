// Styles
import styles from '../styles/Home.module.scss'

// Components
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
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
        <Link href='/todos-los-jugadores' className='p-2 text-xl text-white transition-colors duration-500 rounded-md bg-aero hover:bg-pennBlue'>Buscar a todos los jugadores/teams</Link>
      </header>
      <section className={styles.cities}>
        <h2 className={styles.title}>Principales Ciudades</h2>
        <div className={styles.citiesContainer}>
          <Link href='/poblacion/madrid' className={styles.madrid}>
            <div>Madrid</div>
          </Link>
          <Link href='/poblacion/barcelona' className={styles.barcelona}>
            <div>Barcelona</div>
          </Link>
          <Link href='/poblacion/valencia' className={styles.valencia}>
            <div>Valencia</div>
          </Link>
          <Link href='/poblacion/malaga' className={styles.malaga}>
            <div>Málaga</div>
          </Link>
        </div>
        <form className='flex justify-center py-5' onSubmit={handleSubmit}>
          <input className='px-3 py-2 rounded-l-md md:w-80' type='text' placeholder='Busca tú ciudad' onChange={(e) => setCity(e.target.value)} />
          <button type='submit' className='px-3 font-semibold text-white transition-colors duration-500 bg-aero rounded-r-md md:w-32 hover:bg-pennBlue'>Buscar</button>
        </form>
      </section>
      <Footer />
    </Layout>
  )
}
