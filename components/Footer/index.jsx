import Link from 'next/link'
import styles from './Footer.module.scss'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div>
        create by <Link href='https://maruan.es'> Maruan V. Cardenas</Link> - 603-296-922
      </div>
      <div>
        MixWik sin ánimo de lucro
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
