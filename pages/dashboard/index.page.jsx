// React hooks
import { useState } from 'react'

// db
import PrivateRoute from '../../firebase/auth/PrivateRoute'
import { useSession } from '../../firebase/auth/useSession'

// Componentes
import Image from 'next/image'
import Link from 'next/link'
import Bugs from '../../components/Bugs'
import Layout from '../../components/Layout'
import AllUsers from './components/AllUsers'
import BugsReports from './components/BugsReports'
import Favorites from './components/Favorites'
import MixWikTeams from './components/MixWikTeams'
import MyPublications from './components/MyPublications'
import Profile from './components/Profile/index.tsx'
import { NewPublication } from './components/create-publication/new-gamer'
import { NewTeam } from './components/create-publication/new-team'

// Images
import { BugsIcon, Company, ContactUs, FavSelectedIcon, LogOutIcon } from '../../components/Svg'

// hooks
import { useRouter } from 'next/router'
import { BackgroundDots } from '../../components/background-dots'
import { myLoader } from '../../components/myLoader'
import { useHandleOpenContext } from '../../context'
import { useSignOut } from '../../firebase/auth/SignOut'
import { useGetOneUser } from '../../hooks/use-get-one-user'
import { useComproveRenovationSubscription, useMixWikTeamsCheckSubscription } from '../../hooks/useChecksStripe'
import { useConfirmUserRegister } from '../../hooks/useConfirmUserRegister'
import { MiniCard } from './components/mini-card'
import { ProfileImage } from './components/profile-image'

export default function Dashboard () {
  const handleOpen = useHandleOpenContext()
  const handleSignOut = useSignOut()
  const router = useRouter()
  const { page } = router.query
  const [bugs, setBugs] = useState(false)

  function handleClick (name) {
    router.push({
      pathname: '/dashboard',
      query: { page: name }
    })
    handleOpen('')
  }

  const { userProvider } = useSession()
  const { userServer, setRefetch } = useGetOneUser(userProvider?.uid)
  const mixWikTeams = useMixWikTeamsCheckSubscription(userServer?.mixWikTeams)
  const { date } = useComproveRenovationSubscription(userServer?.mixWikTeams, mixWikTeams)

  useConfirmUserRegister()
  return (
    <Layout>
      <section>
        <BackgroundDots />
        <Profile
          user={userServer}
          mixWikTeams={mixWikTeams}
          page={page}
          setRefetch={setRefetch}
        />
        <NewPublication
          page={page}
          mixWikTeams={mixWikTeams}
          user={userServer}
        />
        <NewTeam
          page={page}
          mixWikTeams={mixWikTeams}
          user={userServer}
        />
        <Favorites
          userServer={userServer}
          page={page}
        />
        <MyPublications
          user={userServer}
          page={page}
        />
        {(page === 'mixWikTeams' || page === 'noTeams' || page === 'noMixWikTeams') && <MixWikTeams mixWikTeams={mixWikTeams} user={userServer} />}
        {page === 'allUsers' && <AllUsers mixWikTeams={mixWikTeams} />}
        {page === 'bugsReports' && <BugsReports />}
        <nav className='flex items-center justify-center h-[90vh]'>
          <ul className='grid h-full grid-cols-4 grid-rows-5 gap-3 p-3 lg:w-1/2 md:3/5'>
            <li
              className='relative flex flex-col items-center col-span-4 row-span-2 gap-1 p-3 overflow-hidden bg-white rounded-lg shadow-lg md:p-5 md:col-span-3'
            >
              <div className='absolute top-0 left-0 w-full overflow-hidden rounded-t-lg h-1/3'>
                <ProfileImage userServer={userServer} userProvider={userProvider} />
              </div>
              <div className='z-10 overflow-hidden border-4 border-white border-solid rounded-full size-20 md:size-28'>
                <ProfileImage userServer={userServer} userProvider={userProvider} />
              </div>
              <h1 className='text-lg font-bold'>{userServer?.name}</h1>
              <button
                onClick={() => handleClick('profile')}
                className='relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold transition-all duration-150 ease-in-out rounded text-pennBlue hover:pl-10 hover:pr-6 bg-gray-50 group'
              >
                <span className='absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-pennBlue group-hover:h-full' />
                <span className='absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12'>
                  <svg className='w-5 h-5 text-aero' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M14 5l7 7m0 0l-7 7m7-7H3' /></svg>
                </span>
                <span className='absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200'>
                  <svg className='w-5 h-5 text-aero' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M14 5l7 7m0 0l-7 7m7-7H3' /></svg>
                </span>
                <span className='relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white'>Ver Perfil</span>
              </button>
            </li>
            <li
              className='flex items-center justify-around col-span-4 gap-2 p-2 overflow-hidden bg-white rounded-lg shadow-lg md:gap-5 md:p-5 md:row-span-3 md:col-span-1 md:flex-col'
            >
              <button
                className='flex flex-col items-center justify-center gap-1 duration-300 border border-solid rounded-lg md:gap-3 size-full border-aero bg-aero/5 hover:bg-aero/10'
                onClick={() => handleClick('jugador')}
              >
                <Image className='size-10 md:size-20' src='/logos/only-icon.png' alt='Icono de publicaciones' width={50} height={50} loader={myLoader} />
                Jugador
              </button>
              <span className='text-xs text-center'>Crear publicación</span>
              <button
                className='flex flex-col items-center justify-center gap-1 duration-300 border border-solid rounded-lg md:gap-3 size-full border-pennBlue bg-pennBlue/10 hover:bg-pennBlue/15'
                onClick={() => handleClick(mixWikTeams ? 'teams' : 'noTeams')}
              >
                <Image className='size-10 md:size-20' src='/logos/team-icon.png' alt='Icono de publicaciones' width={50} height={50} loader={myLoader} />
                Team
              </button>
            </li>
            <li
              className='p-1 overflow-hidden bg-white rounded-lg shadow-lg cursor-pointer group md:p-5'
            >
              <button
                className='flex flex-col items-center justify-center size-full'
                onClick={() => handleClick('favorites')}
              >
                <div className='relative flex items-center justify-center size-16 md:size-32'>
                  <FavSelectedIcon className='absolute fill-current text-pennBlue size-full' />
                  <FavSelectedIcon className='absolute text-red-500 duration-300 scale-0 fill-current size-full group-hover:scale-110' />
                </div>
                <span className='text-sm font-bold text-red-500 md:text-base'>
                  Favoritos
                </span>
              </button>
            </li>
            <li
              className='relative flex flex-col justify-between col-span-3 p-1 duration-300 bg-white rounded-lg shadow-lg cursor-pointer lg:justify-around md:p-3 md:col-span-2 hover:bg-slate-100'
              onClick={() => handleClick('myPublications')}
            >
              <div className='flex justify-between'>
                <MiniCard borderColor='border-aero' bg='bg-aero' />
                <MiniCard borderColor='border-pennBlue' bg='bg-pennBlue' position='left-6 top-1' />
                <MiniCard borderColor='border-orange' bg='bg-orange' position='left-12 top-2' />
                <MiniCard borderColor='border-purple-500' bg='bg-purple-500' position='left-20 top-3' />
              </div>
              <span className='self-center mt-2 font-bold'>
                Publicaciones
              </span>
            </li>
            <li
              className='flex text-white duration-300 rounded-lg shadow-lg cursor-pointer md:col-span-3 col-span-full bg-pennBlue hover:bg-aero'
              onClick={() => handleClick('mixWikTeams')}
            >
              <Image className='w-auto h-full p-2 rounded-l-lg bg-aero' width={10} height={10} src='/logos/icon-logo.png' alt='Icono del logo MixWik' loader={myLoader} />
              {
                mixWikTeams
                  ? (
                    <div className='flex flex-col items-center justify-center w-full gap-5'>
                      <h3 className='text-xl md:text-2xl'>¡Eres de MixWikTeams!</h3>
                      <span className='text-sm'>Fecha de finalización: {date}</span>
                    </div>
                    )
                  : (
                    <div className='relative flex items-center justify-center w-full group'>
                      <h2 className='absolute text-xl md:text-2xl top-1 left-3 opacity-90'>¡Hazte ya!</h2>
                      <Image className='absolute w-auto duration-300 rounded-l-lg opacity-40 set md:h-2/5 h-1/3 group-hover:opacity-100' width={10} height={10} src='/logos/text-logo.png' alt='Icono del logo MixWik' loader={myLoader} />
                      <p className='absolute text-xl md:text-2xl bottom-1 right-3'>Teams</p>
                    </div>
                    )
              }
            </li>
            <li className='col-span-2 bg-white rounded-lg shadow-lg md:col-span-1'>
              <button
                className='flex flex-col items-center justify-center w-full h-full gap-2 font-bold duration-300 bg-white rounded-lg cursor-pointer md:gap-5 hover:bg-slate-100'
                onClick={() => setBugs(!bugs)}
              >
                <BugsIcon className='size-9 text-pennBlue' />
                Reportar Bug
              </button>
            </li>
            <li className='flex flex-col items-center justify-center col-span-2 p-1 duration-300 bg-white rounded-lg shadow-lg cursor-pointer md:col-span-1 hover:bg-slate-100'>
              <Link href='/sobre-nosotros' className='flex flex-col items-center gap-2 font-bold md:gap-5'>
                <Company className='size-9 text-pennBlue' />
                Sobre Nosotros
              </Link>
            </li>
            <li className='flex items-center justify-center col-span-2 p-1 duration-300 bg-white rounded-lg shadow-lg cursor-pointer md:col-span-1 hover:bg-slate-100'>
              <Link href='/contacto' className='flex flex-col items-center gap-2 font-bold md:gap-5'>
                <ContactUs className='size-9 text-pennBlue' />
                Contáctanos
              </Link>
            </li>
            <li
              className='flex items-center justify-center col-span-2 gap-2 p-1 font-bold text-white duration-300 bg-red-400 rounded-lg shadow-lg cursor-pointer md:gap-5 cursor-pointe hover:bg-red-500'
              onClick={() => handleSignOut()}
            >
              Cerrar sesión
              <LogOutIcon className='text-white size-9' />
            </li>
          </ul>
        </nav>
      </section>
      {bugs && <Bugs setBug={setBugs} user={userProvider} />}
    </Layout>
  )
}

Dashboard.Auth = PrivateRoute
