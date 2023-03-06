// React hooks
import { useState, useEffect } from 'react'

// styles
import styles from './Dashboard.module.scss'

// db
import { useSession } from '../../firebase/auth/useSession'
import PrivateRoute from '../../firebase/auth/PrivateRoute'

// Componentes
import Layout from '../../components/Layout'
import NewUser from '../../components/NewUser'
import Profile from '../../components/Dashboard/Profile'
import NewPublication from '../../components/Dashboard/NewPublication'
import Link from 'next/link'
import Image from 'next/image'
import { myLoader } from '../../components/myLoader'

// Images
import { Company, ContactUs, AddPublication, Publications } from '../../components/Svg'
import { useGetOneData } from '../../firebase/hooks/getMethod/useGetOneData'

export default function Dashboard () {
  const [isOpen, setIsOpen] = useState(false)
  const [toggle, setToggle] = useState(false)
  useEffect(() => {
    setToggle('loading')
    setTimeout(() => {
      setToggle('profile')
    }, 500)
  }, [])

  const handleToggle = (name) => {
    setToggle(name)
    setIsOpen(false)
  }

  const user = useSession()
  const currentUser = useGetOneData('users', user.uid)

  if (toggle === 'loading') return <div>Loading...</div>
  if (!currentUser) return <NewUser />

  return (
    <Layout>
      <section data-open={isOpen} className={styles.dashboard}>
        {toggle === 'profile' && <Profile user={currentUser} />}
        {toggle === 'newPublication' && <NewPublication user={currentUser} />}
        <nav data-open={isOpen} className={styles.nav}>
          <ul>
            <li
              data-isActive={toggle === 'profile'}
              onClick={() => handleToggle('profile')}
            >
              <Image
                width={0}
                height={0}
                loader={myLoader}
                src={currentUser.profileImg}
                alt={currentUser.name}
              />
              Perfil
            </li>
            <li
              data-isActive={toggle === 'newPublication'}
              onClick={() => handleToggle('newPublication')}
            >
              <AddPublication />
              Añadir publicación
            </li>
            <li>
              <Publications />
              Mis publicaciones
            </li>
            <li className={styles.ours}>
              <Link href='/sobre-nosotros'>
                <Company />
                Sobre Nosotros
              </Link>
            </li>
            <li className={styles.contact}>
              <Link href='/contacto'>
                <ContactUs />
                Contáctanos
              </Link>
            </li>
            <li className={styles.contact}>
              <Link href='https://donate.stripe.com/test_7sI7v7fD1guj6K4aEF'>
                <ContactUs />
                COBRE
              </Link>
            </li>
          </ul>
        </nav>
        <button
          className={styles.burguerButton} onClick={() => setIsOpen(!isOpen)}
          data-open={isOpen}
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