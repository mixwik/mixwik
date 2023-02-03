import styles from './Dashboard.module.scss'
import { useSession } from '../../firebase/auth/useSession'
import PrivateRoute from '../../firebase/auth/PrivateRoute'
import Layout from '../../components/Layout'
import { useState } from 'react'

export default function Dashboard () {
  const [menuOpen, setMenuOpen] = useState()
  const user = useSession()

  return (
    <Layout>
      <section data-open={menuOpen} className={styles.dashboard}>
        <h1>{user.name}</h1>
        <nav data-open={menuOpen} className={styles.nav}>
          <ul>
            <li>Añadir publicación</li>
            <li>Añadir publicación</li>
          </ul>
        </nav>
        <button
          className={styles.burguerButton} onClick={() => setMenuOpen(!menuOpen)}
          data-open={menuOpen}
        >
          <div className={styles.grid1} />
          <div className={styles.grid2} />
          <div className={styles.grid3} />
          <div className={styles.grid4} />
        </button>
      </section>
    </Layout>
  )
}

Dashboard.Auth = PrivateRoute
