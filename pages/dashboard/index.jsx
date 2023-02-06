// React hooks
import { useState } from 'react'

// styles
import styles from './Dashboard.module.scss'

// db
import { useSession } from '../../firebase/auth/useSession'
import { useGetUsers } from '../../firebase/hooks/getMethod/useGetUsers'
import PrivateRoute from '../../firebase/auth/PrivateRoute'

// Componentes
import Layout from '../../components/Layout'
import NewUser from '../../components/NewUser'

export default function Dashboard () {
  const [menuOpen, setMenuOpen] = useState()
  const user = useSession()
  const users = useGetUsers()

  const currentUser = users.find(find => find.uid === user.uid)

  if (!currentUser) return <NewUser />

  return (
    <Layout>
      <section data-open={menuOpen} className={styles.dashboard}>
        <h1>{currentUser.name}</h1>
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
