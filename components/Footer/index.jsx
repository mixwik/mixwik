import Link from 'next/link'
import styles from './Footer.module.scss'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div>
        MixWik sin ánimo de lucro
      </div>
      <div>
        Create by <Link href='https://maruan.es'>maruan.es</Link>
      </div>
      <div>
        <Link href='/legal/politica-de-cookies'>Cookies </Link>
        -
        <Link href='/legal/politica-de-privacidad'> Privacidad</Link>
      </div>
    </footer>
  )
}

export default Footer
