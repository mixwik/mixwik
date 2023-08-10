// Styles
import styles from '../styles/Home.module.scss'

// Components
import Link from 'next/link'
import ButtonGame from '../components/ButtonGame'
import Cities from '../components/Cities'
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
        <div className='grid grid-cols-2 gap-5 m-10 md:grid-cols-6 md:m-20'>
          <ButtonGame />
        </div>
        <Link href='/todos-los-jugadores' className='p-2 text-xl text-white transition-colors duration-500 rounded-md bg-pennBlue hover:bg-aero '>Buscar a todos los jugadores/teams</Link>
      </header>
      <Cities />
      <Footer />
    </Layout>
  )
}
