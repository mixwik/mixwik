// React
import { useEffect, useState } from 'react'

// Styles
import styles from './Nav.module.scss'

// Next Component
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

// Images
import { Company, ContactUs, UserIcon, UserIconLogin } from '../../components/Svg'
import logo from '../../public/logos/mixwik-logo.png'
import { myLoader } from '../myLoader'

// Log In
import { useSession } from '../../firebase/auth/useSession'
import LogIn from '../LogIn'

const Nav = () => {
  const router = useRouter()
  useEffect(() => {
    if (router.asPath === '/') setTransparent(true)
    else setTransparent(false)
  }, [router.asPath])
  const [isOpen, setIsOpen] = useState(false)
  const [transparent, setTransparent] = useState(false)

  const user = useSession()

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
              user.uid
                ? (
                  <Link href='/dashboard?page=profile'>
                    {
                    user.image
                      ? (

                        <Image width={0} height={0} src={user.image} alt={user.name} loader={myLoader} quality={1} />
                        )
                      : (
                        <UserIconLogin />
                        )
                    }
                  </Link>
                  )
                : (
                  <button className={styles.logInButton} onClick={() => setIsOpen(!isOpen)}>
                    <UserIcon />
                  </button>
                  )
            }
        </div>
      </nav>
      <LogIn setIsOpen={setIsOpen} isOpen={isOpen} />
      <div className={styles.placeHolder} />
    </>
  )
}
export default Nav
