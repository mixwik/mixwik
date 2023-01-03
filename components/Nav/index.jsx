// Styles
import styles from './Nav.module.scss'

// Next Component
import Image from 'next/image'
import Link from 'next/link'

// Images
import logo from '../../public/logos/mixwik-logo.png'
import { PlusIcon, UserIcon } from '../../components/Svg'

const Nav = () => {
  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <Link href='/'>
            <Image layout='responsive' src={logo} alt='logo de MixWik' />
          </Link>
        </div>
        <div className={styles.links}>
          <Link href='/contacto'>Contáctanos</Link>
          <Link href='null'>¿Quiénes Somos?</Link>
          <button><PlusIcon />Players / equipo</button>
          <UserIcon />
        </div>
        <button className={styles.burguerButton}>
          <div className={styles.grid1} />
          <div className={styles.grid2} />
          <div className={styles.grid3} />
          <div className={styles.grid4} />
        </button>
      </nav>
      <div className={styles.placeHolder} />
    </>
  )
}
export default Nav
