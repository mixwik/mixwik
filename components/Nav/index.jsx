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
import { useLogInOpenContext } from '../../context'
import { useSession } from '../../firebase/auth/useSession'
import { useGetOneUser } from '../../hooks/use-get-one-user'
import Bugs from '../Bugs'

const Nav = () => {
  const { setLogInOpen } = useLogInOpenContext()
  const router = useRouter()
  useEffect(() => {
    if (router.asPath === '/') setTransparent(true)
    else setTransparent(false)
  }, [router.asPath])
  const [bugs, setBugs] = useState(false)
  const [transparent, setTransparent] = useState(false)

  const { userProvider } = useSession()
  const { userServer } = useGetOneUser(userProvider?.uid)

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
                  <Link href='/dashboard'>
                    {
                    userProvider?.image
                      ? (

                        <Image width={0} height={0} src={userServer?.profileImg?.url ? userServer?.profileImg.url : userProvider?.image} alt={userProvider?.name} loader={myLoader} quality={1} />
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
        </div>
      </nav>
      {bugs && <Bugs setBug={setBugs} user={userProvider} />}
      <div className={styles.placeHolder} />
    </>
  )
}
export default Nav
