// React
import { useState } from 'react'

// Styles
import styles from './Nav.module.scss'

// Next Component
import Image from 'next/image'
import Link from 'next/link'

// Images
import logo from '../../public/logos/mixwik-logo.png'
import { ContatUs, UserIcon } from '../../components/Svg'
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
        <Link className={styles.contact} href='/contacto'> <ContatUs /> Contáctanos</Link>
        <Link className={styles.us} href='null'>
          ¿Qué es MixWik?
        </Link>
        <div className={styles.logIn}>
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
        {/* <button
          className={styles.burguerButton} onClick={() => setMenuOpen(!menuOpen)}
          data-open={menuOpen}
        >
          <div className={styles.grid1} />
          <div className={styles.grid2} />
          <div className={styles.grid3} />
          <div className={styles.grid4} />
        </button> */}
      </nav>
      {
        isOpen && <LogIn setIsOpen={setIsOpen} />
      }
      <div className={styles.placeHolder} />
    </>
  )
}
export default Nav
