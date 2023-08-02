import Link from 'next/link'
import { useSession } from '../../firebase/auth/useSession'
import styles from './Ban.module.scss'

const Ban = () => {
  const user = useSession()
  return (
    <section className={styles.ban}>
      <h1>{user.name}</h1>
      <p>Lamentamos informarle de que se encuentra baneado de MixWik</p>
      <p>Si cree que esto es un error, por favor, contacte con nosotros a través de nuestro correo electrónico: <Link href='mailto:infomixwik@gmail.com'>infomixwik@gmail.com</Link></p>
    </section>
  )
}

export default Ban
