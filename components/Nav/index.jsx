// React
import { useEffect, useState } from 'react'

// Styles
import styles from './Nav.module.scss'

// Next Component
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

// Images
import { BugsIcon, Company, ContactUs, UserIcon, UserIconLogin } from '../../components/Svg'
import logo from '../../public/logos/mixwik-logo.png'
import { myLoader } from '../myLoader'

// Log In
import { useGetUsers } from '../../application/useGetUsers'
import { useHandleOpenContext, useLogInOpenContext } from '../../context'
import { useSession } from '../../firebase/auth/useSession'
import Bugs from '../Bugs'

const Nav = () => {
  const { setLogInOpen } = useLogInOpenContext()
  const handleOpen = useHandleOpenContext()
  const router = useRouter()
  useEffect(() => {
    if (router.asPath === '/') setTransparent(true)
    else setTransparent(false)
  }, [router.asPath])
  const [bugs, setBugs] = useState(false)
  const [transparent, setTransparent] = useState(false)

  const { userProvider } = useSession()
  const { users } = useGetUsers()

  users.forEach(userb => {
    if (userb.ban) {
      if (userb.uid === userProvider?.uid) {
        router.push('/ban')
      }
    }
    if (userb.admonition >= 3) {
      if (userb.uid === userProvider?.uid) {
        router.push('/ban')
      }
    }
  })
  const handleOpenButton = () => {
    handleOpen('dashboardNav')
    router.push('/dashboard?page=profile')
  }

  return (
    <>
      <nav className={styles.nav} data-transparent={transparent}>
        <div className={styles.logo}>
          <Link href='/'>
            <Image src={logo} alt='logo de MixWik' />
          </Link>
        </div>
        <div className={styles.logIn}>
          <ul className={styles.links}>
            <li>
              <button onClick={() => setBugs(!bugs)}>
                <BugsIcon />
                Reportar Bugs
              </button>
            </li>
            <li>
              <Link href='/sobre-nosotros'>
                <Company />
                Sobre nosotros
              </Link>
            </li>
            <li>
              <Link href='/contacto'>
                <ContactUs />
                Contáctanos
              </Link>
            </li>
          </ul>
          {
              userProvider?.uid
                ? (
                  <Link href='/dashboard?page=profile'>
                    {
                    userProvider?.image
                      ? (

                        <Image width={0} height={0} src={userProvider?.image} alt={userProvider?.name} loader={myLoader} quality={1} />
                        )
                      : (
                        <UserIconLogin />
                        )
                    }
                  </Link>
                  )
                : (
                  <button className={styles.logInButton} onClick={() => setLogInOpen(true)}>
                    <UserIcon />
                  </button>
                  )
            }
          <button onClick={handleOpenButton} className='md:hidden'>
            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-10 h-10 font-bold'>
              <path strokeLinecap='round' strokeLinejoin='round' d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5' />
            </svg>
          </button>
        </div>
      </nav>
      {bugs && <Bugs setBug={setBugs} user={userProvider} />}
      <div className={styles.placeHolder} />
    </>
  )
}
export default Nav
