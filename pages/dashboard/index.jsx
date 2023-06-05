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
import Publications from '../../components/Dashboard/Publications'
import Layout from '../../components/Layout'
import NewUser from '../../components/NewUser'
import { myLoader } from '../../components/myLoader'

// Images
import { AddPublication, BugsIcon, Company, ContactUs, LogOutIcon, PublicationsIcon } from '../../components/Svg'
import iconMixWik from '../../public/logos/icon-logo.png'

// hooks
import { useRouter } from 'next/router'
import Bugs from '../../components/Bugs'
import AllUsers from '../../components/Dashboard/AllUsers'
import NewTeam from '../../components/Dashboard/NewTeam'
import { useSignOut } from '../../firebase/auth/SignOut'
import { useGetOneData } from '../../firebase/hooks/getMethod/useGetOneData'
import { useMixWikTeamsCheckSubscription } from '../../hooks/useChecksStripe'

export default function Dashboard () {
  const handleSignOut = useSignOut()
  const router = useRouter()
  const { page } = router.query
  const [isOpen, setIsOpen] = useState(false)
  const [toggle, setToggle] = useState(false)
  const [bugs, setBugs] = useState(false)
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
    setIsOpen(false)
  }

  const user = useSession()
  const currentUser = useGetOneData('users', user.uid)
  const mixWikTeams = useMixWikTeamsCheckSubscription(currentUser.mixWikTeams)
  const master1 = process.env.NEXT_PUBLIC_MASTER1
  const master2 = process.env.NEXT_PUBLIC_MASTER2
  if (toggle === 'loading') return <div>Loading...</div>
  if (currentUser.length === 0) return <NewUser />

  return (
    <Layout>
      <section data-open={isOpen} className={styles.dashboard}>
        {page === 'profile' && <Profile user={currentUser} mixWikTeams={mixWikTeams} />}
        {page === 'newPublication' && <NewPublication mixWikTeams={mixWikTeams} user={currentUser} setTeams={setToggle} teams={toggle} />}
        {page === 'myPublications' && <MyPublications user={currentUser} />}
        {(page === 'mixWikTeams' || page === 'noTeams' || page === 'noMixWikTeams') && <MixWikTeams mixWikTeams={mixWikTeams} user={currentUser} />}
        {page === 'teams' && <NewTeam mixWikTeams={mixWikTeams} user={currentUser} />}
        {page === 'allUsers' && <AllUsers mixWikTeams={mixWikTeams} />}
        {page === 'publications' && <Publications mixWikTeams={mixWikTeams} />}
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
              data-isActive={page === 'publications' || page === 'newPublication' || page === 'teams'}
              onClick={() => handleClick('publications')}
            >
              <AddPublication />
              Añadir publicación
            </li>
            <li
              data-isActive={page === 'myPublications'}
              onClick={() => handleClick('myPublications')}
            >
              <PublicationsIcon />
              Mis publicaciones
            </li>
            <li className={styles.ours}>
              <button onClick={() => setBugs(!bugs)}>
                <BugsIcon />
                Reportar Bug
              </button>
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
            {
              (user.uid === master1 || user.uid === master2) && (
                <li
                  data-isActive={page === 'allUsers'}
                  onClick={() => handleClick('allUsers')}
                >
                  Usuarios
                </li>
              )
            }
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
      {bugs && <Bugs setBug={setBugs} user={user} />}
    </Layout>
  )
}

Dashboard.Auth = PrivateRoute
