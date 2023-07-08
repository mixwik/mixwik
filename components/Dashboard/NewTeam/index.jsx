import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import clashRoyal from '../../../public/logos/Clash-Royal2.png'
import lol from '../../../public/logos/LOL3.png'
import valorant from '../../../public/logos/VALORANT4.png'
import csgo from '../../../public/logos/csgo.png'
import fortnite from '../../../public/logos/fortnite.png'
import Csgo from './Csgo'
import Fortnite from './Fortnite'
import Lol from './Lol'
import styles from './NewTeam.module.scss'

const NewTeam = ({ user, mixWikTeams }) => {
  const [toggle, setToggle] = useState('nav')
  return (
    <section className={styles.newTeam}>
      <h1 className={styles.title}>Selecciona categoría <Link href='/dashboard?page=publications'>Volver atrás</Link></h1>
      <div className={styles.selectCategory} onChange={(e) => setToggle(e.target.value)}>
        <span onClick={() => setToggle('csgo')}>
          <Image src={csgo} alt='logo de csgo' />
          Counter Strike 2
        </span>
        <span onClick={() => setToggle('lol')}>
          <Image src={lol} alt='logo de League Of Legends' />
          League Of Legends<br />
        </span>
        <span onClick={() => setToggle('fortnite')}>
          <Image src={fortnite} alt='logo de Fortnite' />
          Fortnite<br />
        </span>
        <span value=''>
          <Image src={clashRoyal} alt='logo de Clash Royal' />
          Clash Royal<br /> (Próximamente)
        </span>
        <span value=''>
          <Image src={valorant} alt='logo de Valorant' />
          Valorant<br /> (Próximamente)
        </span>
      </div>
      <Csgo setToggle={setToggle} toggle={toggle} currentUser={user} teams={mixWikTeams} />
      <Lol setToggle={setToggle} toggle={toggle} currentUser={user} teams={mixWikTeams} />
      <Fortnite setToggle={setToggle} toggle={toggle} currentUser={user} teams={mixWikTeams} />
    </section>
  )
}

export default NewTeam
