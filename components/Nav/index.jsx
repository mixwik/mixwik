// React
import { useState } from 'react'

// Styles
import styles from './Nav.module.scss'

// Next Component
import Image from 'next/image'
import Link from 'next/link'

// Images
import logo from '../../public/logos/mixwik-logo.png'
import { PlusIcon, UserIcon } from '../../components/Svg'
import LogIn from '../LogIn'

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <Link href='/'>
            <Image src={logo} alt='logo de MixWik' />
          </Link>
        </div>
        <div className={styles.links}>
          <Link href='/contacto'>Contáctanos</Link>
          <Link href='null'>¿Quiénes Somos?</Link>
          <button>
            <PlusIcon />Players / equipo
          </button>
          <button className={styles.logInButton} onClick={() => setIsOpen(!isOpen)}>
            <UserIcon />
          </button>
        </div>
        <button className={styles.burguerButton}>
          <div className={styles.grid1} />
          <div className={styles.grid2} />
          <div className={styles.grid3} />
          <div className={styles.grid4} />
        </button>
      </nav>
      {
        isOpen && <LogIn setIsOpen={setIsOpen} />
      }
      <div className={styles.placeHolder} />
    </>
  )
}
export default Nav
