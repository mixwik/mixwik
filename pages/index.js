import styles from './Home.module.scss'
import Layout from '../components/Layout'
import Video from '../components/video'
import ButtonGame from '../components/ButtonGame'
import Image from 'next/image'
import logo from '../public/logos/mixwik-logo.png'
import Link from 'next/link'
import { PlusIcon, UserIcon } from '../components/Svg'

export default function Home () {
  return (
    <Layout title='MixWik'>
      <header className={styles.header}>
        <Video />
        <nav className={styles.nav}>
          <div className={styles.logo}>
            <Image layout='responsive' src={logo} alt='logo de MixWik' />
          </div>
          <div className={styles.links}>
            <Link href='null'>Contáctanos</Link>
            <Link href='null'>¿Quiénes Somos?</Link>
            <button><PlusIcon />Players / equipo</button>
            <UserIcon />
          </div>
        </nav>
        <h1>Encuentra jugadores y equipos cerca de ti</h1>
        <div className={styles.games}>
          <ButtonGame />
        </div>
      </header>
    </Layout>
  )
}
