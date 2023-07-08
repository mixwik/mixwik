import Image from 'next/image'
import Link from 'next/link'
import onlyIcon from '../../../public/logos/only-icon.png'
import teamIcon from '../../../public/logos/team-icon.png'
import styles from './Publications.module.scss'

const Publications = ({ mixWikTeams }) => {
  return (
    <section className={styles.publications}>
      <h1>Crea una nueva publicación</h1>
      <div className={styles.buttons}>
        <Link href='/dashboard?page=newPublication' className={styles.buttonOnly}>
          <Image src={onlyIcon} alt='Icono de jugador' />
          Jugador
        </Link>
        {
         mixWikTeams
           ? (
             <Link href='/dashboard?page=teams' className={styles.buttonTeam}><Image src={teamIcon} alt='Icono de team' />Team/Equipo</Link>
             )
           : (
             <Link className={styles.buttonTeam} href='/dashboard?page=mixWikTeams'><Image src={teamIcon} alt='Icono de team' />Team/Equipo</Link>
             )
        }
      </div>
    </section>
  )
}

export default Publications
