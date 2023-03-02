// React
import { useState, useEffect } from 'react'

// Styles
import styles from './Nav.module.scss'

// Next Component
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

// Images
import logo from '../../public/logos/mixwik-logo.png'
import { Company, ContactUs, UserIcon, UserIconLogin } from '../../components/Svg'
import { myLoader } from '../myLoader'

// Log In
import LogIn from '../LogIn'
import { useSession } from '../../firebase/auth/useSession'
import { useGetOneData } from '../../firebase/hooks/getMethod/useGetOneData'

const Nav = () => {
  const router = useRouter()
  useEffect(() => {
    if (router.asPath === '/') setTransparent(true)
    else setTransparent(false)
  }, [router.asPath])
  const [isOpen, setIsOpen] = useState(false)
  const [transparent, setTransparent] = useState(false)

  const user = useSession()
  const currentUser = useGetOneData('users', user.uid)

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
                  <Link href='/dashboard'>
                    {
                    currentUser.profileImg
                      ? (

                        <Image width={0} height={0} src={currentUser.profileImg} alt={user.name} loader={myLoader} quality={1} />
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
