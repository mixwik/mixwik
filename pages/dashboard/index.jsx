// React hooks
import { useEffect, useState } from 'react'

// styles
import styles from './Dashboard.module.scss'

// db
import PrivateRoute from '../../firebase/auth/PrivateRoute'
import { useSession } from '../../firebase/auth/useSession'

// Componentes
import Image from 'next/image'
import Link from 'next/link'
import MixWikTeams from '../../components/Dashboard/MixWikTeams'
import MyPublications from '../../components/Dashboard/MyPublications'
import NewPublication from '../../components/Dashboard/NewPublication'
import Profile from '../../components/Dashboard/Profile'
import Layout from '../../components/Layout'
import { myLoader } from '../../components/myLoader'
import NewUser from '../../components/NewUser'

// Images
import { AddPublication, Company, ContactUs, LogOutIcon, Publications } from '../../components/Svg'
import iconMixWik from '../../public/logos/icon-logo.png'

// hooks
import { useRouter } from 'next/router'
import { useSignOut } from '../../firebase/auth/SignOut'
import { useGetOneData } from '../../firebase/hooks/getMethod/useGetOneData'

export default function Dashboard () {
  const handleSignOut = useSignOut()
  const router = useRouter()
  const { page } = router.query
  const [isOpen, setIsOpen] = useState(false)
  const [toggle, setToggle] = useState(false)
  useEffect(() => {
    setToggle('loading')
    setTimeout(() => {
      setToggle('profile')
    }, 500)
  }, [])

  function handleClick (name) {
    router.push({
      pathname: '/dashboard',
      query: { page: name }
    })
  }

  const user = useSession()
  const currentUser = useGetOneData('users', user.uid)
  if (toggle === 'loading') return <div>Loading...</div>
  if (currentUser.length === 0) return <NewUser />

  return (
    <Layout>
      <section data-open={isOpen} className={styles.dashboard}>
        {page === 'profile' && <Profile user={currentUser} />}
        {page === 'newPublication' && <NewPublication user={currentUser} />}
        {page === 'myPublications' && <MyPublications user={currentUser} />}
        {page === 'mixWikTeams' && <MixWikTeams user={currentUser} />}
        <nav data-open={isOpen} className={styles.nav}>
          <ul>
            <li
              data-isActive={page === 'profile'}
              onClick={() => handleClick('profile')}
            >
              <Image
                width={0}
                height={0}
                loader={myLoader}
                src={user.image}
                alt={user.name}
              />
              Perfil
            </li>
            <li
              data-isActive={page === 'newPublication'}
              onClick={() => handleClick('newPublication')}
            >
              <AddPublication />
              Añadir publicación
            </li>
            <li
              data-isActive={page === 'myPublications'}
              onClick={() => handleClick('myPublications')}
            >
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
            <li
              data-isActive={page === 'mixWikTeams'}
              onClick={() => handleClick('mixWikTeams')}
            >
              <Image src={iconMixWik} alt='Icono del logo MixWik' />
              MixWik Teams
            </li>
            <li
              onClick={() => handleSignOut()}
            >
              <LogOutIcon />
              Cerrar sesión
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
