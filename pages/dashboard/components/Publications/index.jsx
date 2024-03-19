import Image from 'next/image'
import Link from 'next/link'
import onlyIcon from '../../../../public/logos/only-icon.png'
import teamIcon from '../../../../public/logos/team-icon.png'
import styles from './Publications.module.scss'

const Publications = ({ mixWikTeams }) => {
  return (
    <section className={styles.publications}>
      <h1>Crea una nueva publicación</h1>
      <div className={styles.buttons}>
        <Link href='/dashboard?page=jugador' className={styles.buttonOnly}>
          <Image src={onlyIcon} alt='Icono de jugador' />
          Jugador
          <p className='p-5 text-lg'>
            Crea tu personaje igual que en tu juego preferido, ya sea casual o competitivo esta es la manera de que te encuentren.
          </p>
        </Link>
        {
         mixWikTeams
           ? (
             <Link href='/dashboard?page=teams' className={styles.buttonTeam}><Image src={teamIcon} alt='Icono de team' />Team/Equipo
               <p className='p-5 text-lg'>
                 Crea un equipo tú mismo ya sean con tus vecinos o amigos. Se un líder o un gran compañero. Crea tu equipo y sube al siguiente nivel del juego.
               </p>
             </Link>
             )
           : (
             <Link className={styles.buttonTeam} href='/dashboard?page=mixWikTeams'><Image src={teamIcon} alt='Icono de team' />
               Team/Equipo
               <p className='p-5 text-lg'>
                 Crea un equipo tú mismo ya sean con tus vecinos o amigos. Se un líder o un gran compañero. Crea tu equipo y sube al siguiente nivel del juego.

               </p>
             </Link>
             )
        }
      </div>
    </section>
  )
}

export default Publications
