// React hooks
import { useEffect, useState } from 'react'

// db
import PrivateRoute from '../../firebase/auth/PrivateRoute'
import { useSession } from '../../firebase/auth/useSession'

// Componentes
import Image from 'next/image'
import Link from 'next/link'
import Bugs from '../../components/Bugs'
import Layout from '../../components/Layout'
import PageLoader from '../../components/Loaders/PageLoader'
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
import { BackgroundDots } from '../../components/background-dots'
import { useHandleOpenContext } from '../../context'
import { COLLECTIONS } from '../../domain/constants'
import { useSignOut } from '../../firebase/auth/SignOut'
import { useGetOneData } from '../../firebase/hooks/getMethod/useGetOneData'
import { useMixWikTeamsCheckSubscription } from '../../hooks/useChecksStripe'
import { useConfirmUserRegister } from '../../hooks/useConfirmUserRegister'
import { ProfileImage } from './components/profile-image'

export default function Dashboard () {
  const handleOpen = useHandleOpenContext()
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
      <section>
        <BackgroundDots />
        {page === 'profile' && <Profile user={currentUser} mixWikTeams={mixWikTeams} />}
        {page === 'newPublication' && <NewPublication mixWikTeams={mixWikTeams} user={currentUser} setTeams={setToggle} teams={toggle} />}
        {page === 'myPublications' && <MyPublications user={currentUser} />}
        {(page === 'mixWikTeams' || page === 'noTeams' || page === 'noMixWikTeams') && <MixWikTeams mixWikTeams={mixWikTeams} user={currentUser} />}
        {page === 'teams' && <NewTeam mixWikTeams={mixWikTeams} user={currentUser} />}
        {page === 'allUsers' && <AllUsers mixWikTeams={mixWikTeams} />}
        {page === 'publications' && <Publications mixWikTeams={mixWikTeams} />}
        {page === 'bugsReports' && <BugsReports />}
        {page === 'favorites' && <Favorites currentUser={currentUser} />}
        <nav className='flex items-center justify-center h-[90vh]'>
          <ul className='grid h-full grid-cols-4 grid-rows-5 gap-3 p-3 md:w-[1px]/2'>
            <li
              className='relative flex flex-col items-center col-span-4 row-span-2 gap-1 p-3 overflow-hidden bg-white rounded-lg shadow-lg md:p-5 md:col-span-3'
            >
              <div className='absolute top-0 left-0 w-full overflow-hidden rounded-t-lg h-1/3'>
                <ProfileImage user={currentUser} userProvider={userProvider} />
              </div>
              <div className='z-10 overflow-hidden border-4 border-white border-solid rounded-full size-24 md:size-28'>
                <ProfileImage user={currentUser} userProvider={userProvider} />
              </div>
              <h1 className='text-lg font-bold'>{currentUser?.name}</h1>
              <span className='text-xs text-gray-500'>{currentUser?.email}</span>
              <button className='px-5 py-2 text-xs text-white transition-transform duration-300 rounded-full bg-pennBlue hover:scale-105' onClick={() => handleClick('profile')}>Editar perfil</button>
            </li>
            <li
              className='col-span-4 p-1 overflow-hidden bg-white rounded-lg shadow-lg cursor-pointer md:row-span-3 md:col-span-1'
              onClick={() => handleClick('publications')}
            >
              <AddPublication />
              Añadir publicación
            </li>
            <li
              className='p-1 bg-white rounded-lg shadow-lg cursor-pointer'
              onClick={() => handleClick('favorites')}
            >
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='w-10 h-10'>
                <path fillRule='evenodd' d='M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z' clipRule='evenodd' />
              </svg>
              Mis Favoritos
            </li>
            <li
              className='col-span-3 p-1 bg-white rounded-lg shadow-lg cursor-pointer md:col-span-2'
              onClick={() => handleClick('myPublications')}
            >
              <PublicationsIcon />
              Mis publicaciones
            </li>
            <li
              className='p-1 text-white rounded-lg shadow-lg cursor-pointer md:col-span-3 col-span-full bg-pennBlue'
              onClick={() => handleClick('mixWikTeams')}
            >
              <Image className='w-10 h-10' src={iconMixWik} alt='Icono del logo MixWik' />
              MixWik Teams
            </li>
            <li className='col-span-2 p-1 bg-white rounded-lg shadow-lg md:col-span-1'>
              <button onClick={() => setBugs(!bugs)}>
                <BugsIcon />
                Reportar Bug
              </button>
            </li>
            <li className='col-span-2 p-1 bg-white rounded-lg shadow-lg md:col-span-1'>
              <Link href='/sobre-nosotros'>
                <Company />
                Sobre Nosotros
              </Link>
            </li>
            <li className='col-span-2 p-1 bg-white rounded-lg shadow-lg md:col-span-1'>
              <Link href='/contacto'>
                <ContactUs />
                Contáctanos
              </Link>
            </li>
            <li
              className='col-span-2 p-1 bg-red-400 rounded-lg shadow-lg cursor-pointer'
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
