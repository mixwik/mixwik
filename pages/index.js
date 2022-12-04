import styles from './Home.module.scss'
import Layout from '../components/Layout'
import Video from '../components/Video'
import ButtonGame from '../components/ButtonGame'

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
    </Layout>
  )
}
