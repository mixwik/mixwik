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
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <Image layout='responsive' src={logo} alt='logo de MixWik' />
      </div>
      <div className={styles.links}>
        <Link href='null'>Contáctanos</Link>
        <Link href='null'>¿Quiénes Somos?</Link>
        <button><PlusIcon />Players / equipo</button>
        <UserIcon />
      </div>
      <button className={styles.burguerButtom}>
        <div />
      </button>
    </nav>
  )
}
export default Nav
