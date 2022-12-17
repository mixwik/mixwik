// Hooks
import { useEffect, useState } from 'react'

// Styles
import styles from './Home.module.scss'

// Components
import Layout from '../components/Layout'
import Video from '../components/Video'
import ButtonGame from '../components/ButtonGame'

export default function Home () {
  const [position, setPosition] = useState()
  useEffect(() => {
    let watchID
    if ('geolocation' in navigator) {
      watchID = navigator.geolocation.watchPosition((position) => {
        setPosition([position.coords.latitude, position.coords.longitude, position.coords.accuracy, position.coords.heading])
      })
    } else {
      alert('No dispones de Geolocalización')
    }

    return () => navigator.geolocation.clearWatch(watchID)
  }, [])

  console.log(position)
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
