import Link from 'next/link'
import styles from './Footer.module.scss'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <section className={styles.company}>
        <h4>Empresa</h4>
        <ul>
          <li>
            <Link href='/'>
              Sobre nosotros
            </Link>
          </li>
          <li>
            <Link href='/contacto'>
              Contáctanos
            </Link>
          </li>
        </ul>
      </section>
    </footer>
  )
}
export default Footer
