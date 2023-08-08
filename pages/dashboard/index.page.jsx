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
import BugsReports from '../../components/Dashboard/BugsReports'
import MixWikTeams from '../../components/Dashboard/MixWikTeams'
import MyPublications from '../../components/Dashboard/MyPublications'
import NewPublication from '../../components/Dashboard/NewPublication'
import Profile from '../../components/Dashboard/Profile'
import Publications from '../../components/Dashboard/Publications'
import Layout from '../../components/Layout'
import PageLoader from '../../components/Loaders/PageLoader'
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
import { useHandleOpenContext, useOpenContext } from '../../context'
import { useSignOut } from '../../firebase/auth/SignOut'
import { useGetOneData } from '../../firebase/hooks/getMethod/useGetOneData'
import { useMixWikTeamsCheckSubscription } from '../../hooks/useChecksStripe'
import Favorites from './components/Favorites'

export default function Dashboard () {
  const handleOpen = useHandleOpenContext()
  const isOpen = useOpenContext()
  const handleSignOut = useSignOut()
  const router = useRouter()
  const { page } = router.query
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
    handleOpen('')
  }

  const user = useSession()
  const currentUser = useGetOneData('users', user.uid)
  const mixWikTeams = useMixWikTeamsCheckSubscription(currentUser.mixWikTeams)
  const master1 = process.env.NEXT_PUBLIC_MASTER1
  const master2 = process.env.NEXT_PUBLIC_MASTER2
  if (toggle === 'loading') return <PageLoader />
  if (currentUser.length === 0) return <NewUser />

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
              (user.uid === master1 || user.uid === master2) && (
                <li
                  data-isActive={page === 'allUsers'}
                  onClick={() => handleClick('allUsers')}
                >
                  Usuarios
                </li>
              )
            }
            {
              (user.uid === master1 || user.uid === master2) && (
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
      {bugs && <Bugs setBug={setBugs} user={user} />}
    </Layout>
  )
}

Dashboard.Auth = PrivateRoute
