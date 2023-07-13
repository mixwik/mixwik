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
        <div className={styles.games}>
          <ButtonGame />
        </div>
        <Link href='/todos-los-jugadores' className={styles.allGames}>Buscar a todos los jugadores/teams</Link>
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
          <Link href='/poblacion/zaragoza' className={styles.zaragoza}>
            <div>Zaragoza</div>
          </Link>
          <Link href='/poblacion/murcia' className={styles.murcia}>
            <div>Murcia</div>
          </Link>
        </div>
        <form className='flex justify-center py-5' onSubmit={handleSubmit}>
          <input className='p-3 rounded-l-md md:w-80' type='text' placeholder='Busca tú ciudad' onChange={(e) => setCity(e.target.value)} />
          <button type='submit' className='bg-aero p-3 rounded-r-md text-white font-semibold md:w-32 hover:bg-pennBlue transition-colors duration-500'>Buscar</button>
        </form>
      </section>
      <Footer />
    </Layout>
  )
}
