// Styles
import styles from '../styles/Home.module.scss'

// Components
import Link from 'next/link'
import ButtonGame from '../components/ButtonGame'
import Footer from '../components/Footer'
import Video from '../components/Home-video'
import Layout from '../components/Layout'

// Images

export default function Home () {
  return (
    <Layout title='MixWik'>
      <header className={styles.header}>
        <Video />
        <h1>Encuentra jugadores y equipos cerca de ti</h1>
        <div className={styles.games}>
          <ButtonGame />
        </div>
      </header>
      <section className={styles.cities}>
        <h2>Principales Ciudades</h2>
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
      </section>
      <Footer />
    </Layout>
  )
}
