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
import Bugs from '../../components/Bugs'
import Layout from '../../components/Layout'
import PageLoader from '../../components/Loaders/PageLoader'
import { myLoader } from '../../components/myLoader'
import AllUsers from './components/AllUsers'
import BugsReports from './components/BugsReports'
import Favorites from './components/Favorites'
import MixWikTeams from './components/MixWikTeams'
import MyPublications from './components/MyPublications'
import NewPublication from './components/NewPublication'
import NewTeam from './components/NewTeam'
import Profile from './components/Profile'
import Publications from './components/Publications'

// Images
import { AddPublication, BugsIcon, Company, ContactUs, LogOutIcon, PublicationsIcon } from '../../components/Svg'
import iconMixWik from '../../public/logos/icon-logo.png'

// hooks
import { useRouter } from 'next/router'
import { useHandleOpenContext, useOpenContext } from '../../context'
import { useSignOut } from '../../firebase/auth/SignOut'
import { useGetOneData } from '../../firebase/hooks/getMethod/useGetOneData'
import { useMixWikTeamsCheckSubscription } from '../../hooks/useChecksStripe'
import { useConfirmUserRegister } from '../../hooks/useConfirmUserRegister'
import { useMaster } from '../../hooks/useMaster'
import { COLLECTIONS } from '../../domain/constants'

export default function Dashboard () {
  const { master } = useMaster()
  const handleOpen = useHandleOpenContext()
  const isOpen = useOpenContext()
  const handleSignOut = useSignOut()
  const router = useRouter()
  const { page } = router.query
  const [toggle, setToggle] = useState(false)
  const [bugs, setBugs] = useState(false)

  function handleClick (name) {
    router.push({
      pathname: '/dashboard',
      query: { page: name }
    })
    handleOpen('')
  }

  const { userProvider } = useSession()
  const currentUser = useGetOneData(COLLECTIONS.users, userProvider?.uid)
  const mixWikTeams = useMixWikTeamsCheckSubscription(currentUser.mixWikTeams)

  useEffect(() => {
    setToggle('loading')
    setTimeout(() => {
      setToggle('profile')
    }, 500)
    return () => {
      setToggle(false)
    }
  }, [currentUser, router])

  useConfirmUserRegister()
  if (toggle === 'loading') return <PageLoader />

  return (
    <Layout>
      <section data-open={isOpen === 'dashboardNav'} className={styles.dashboard}>
        {page === 'profile' && <Profile user={currentUser} mixWikTeams={mixWikTeams} />}
        {page === 'newPublication' && <NewPublication mixWikTeams={mixWikTeams} user={currentUser} setTeams={setToggle} teams={toggle} />}
        {page === 'myPublications' && <MyPublications user={currentUser} />}
        {(page === 'mixWikTeams' || page === 'noTeams' || page === 'noMixWikTeams') && <MixWikTeams mixWikTeams={mixWikTeams} user={currentUser} />}
        {page === 'teams' && <NewTeam mixWikTeams={mixWikTeams} user={currentUser} />}
        {page === 'allUsers' && <AllUsers mixWikTeams={mixWikTeams} />}
        {page === 'publications' && <Publications mixWikTeams={mixWikTeams} />}
        {page === 'bugsReports' && <BugsReports />}
        {page === 'favorites' && <Favorites currentUser={currentUser} />}
        <nav data-open={isOpen === 'dashboardNav'} className={styles.nav}>
          <ul>
            <li
              data-isActive={page === 'profile'}
              onClick={() => handleClick('profile')}
            >
              {
              userProvider?.image
                ? (
                  <Image
                    width={0}
                    height={0}
                    loader={myLoader}
                    src={userProvider?.image}
                    alt={userProvider?.name}
                  />
                  )
                : (
                  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='w-10 h-10'>
                    <path fillRule='evenodd' d='M12 2a3 3 0 100 6 3 3 0 000-6zm-5 3a5 5 0 019.858 1.716c.03.1.142.284.142.284a.75.75 0 01-.142.284A5 5 0 017 5H4a1 1 0 00-1 1v12a1 1 0 001 1h3a5 5 0 010-10zm10 10a5 5 0 110-10 5 5 0 010 10z' clipRule='evenodd' />
                  </svg>

                  )
            }
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
            <li
              data-isActive={page === 'favorites'}
              onClick={() => handleClick('favorites')}
            >
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='w-10 h-10'>
                <path fillRule='evenodd' d='M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z' clipRule='evenodd' />
              </svg>
              Mis Favoritos
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
              master && (
                <li
                  data-isActive={page === 'allUsers'}
                  onClick={() => handleClick('allUsers')}
                >
                  Usuarios
                </li>
              )
            }
            {
              master && (
                <li
                  data-isActive={page === 'bugsReports'}
                  onClick={() => handleClick('bugsReports')}
                >
                  Reporte de Bug
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
      </section>
      {bugs && <Bugs setBug={setBugs} user={userProvider} />}
    </Layout>
  )
}

Dashboard.Auth = PrivateRoute
