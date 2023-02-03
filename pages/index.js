// Styles
import styles from '../styles/Home.module.scss'

// Components
import Layout from '../components/Layout'
import Video from '../components/Home-video'
import ButtonGame from '../components/ButtonGame'
import Footer from '../components/Footer'

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
      <Footer />
    </Layout>
  )
}
