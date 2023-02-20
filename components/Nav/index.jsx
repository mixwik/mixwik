// React
import { useState } from 'react'

// Styles
import styles from './Nav.module.scss'

// Next Component
import Image from 'next/image'
import Link from 'next/link'

// Images
import logo from '../../public/logos/mixwik-logo.png'
import { Company, ContactUs, UserIcon } from '../../components/Svg'
import LogIn from '../LogIn'

// Log In
import { useSession } from '../../firebase/auth/useSession'
import { myLoader } from '../myLoader'

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false)
  // const [menuOpen, setMenuOpen] = useState(false)
  const user = useSession()
  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <Link href='/'>
            <Image src={logo} alt='logo de MixWik' />
          </Link>
        </div>
        <div className={styles.logIn}>
          <ul className={styles.links}>
            <li>
              <Link href='/'>
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
                    <Image width={0} height={0} src={user.image} alt={user.name} loader={myLoader} quality={1} />
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
