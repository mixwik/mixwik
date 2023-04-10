import Image from 'next/image'
import { useState } from 'react'
import clashRoyal from '../../../public/logos/Clash-Royal2.png'
import lol from '../../../public/logos/LOL3.png'
import valorant from '../../../public/logos/VALORANT4.png'
import csgo from '../../../public/logos/csgo.png'
import fortnite from '../../../public/logos/fortnite.png'
import Csgo from './Csgo'
import styles from './NewTeam.module.scss'

const NewTeam = ({ user, mixWikTeams }) => {
  const [toggle, setToggle] = useState('nav')
  return (
    <section className={styles.newTeam}>
      <h1 className={styles.title}>Añadir nuevo team</h1>
      <div className={styles.selectCategory} onChange={(e) => setToggle(e.target.value)}>
        <span onClick={() => setToggle('csgo')}>
          <Image src={csgo} alt='logo de csgo' />
          Counter Strike Global Ofensive
        </span>
        <span value=''>
          <Image src={fortnite} alt='logo de Fortnite' />
          Fortnite<br /> (Próximamente)
        </span>
        <span value=''>
          <Image src={valorant} alt='logo de Valorant' />
          Valorant<br /> (Próximamente)
        </span>
        <span value=''>
          <Image src={clashRoyal} alt='logo de Clash Royal' />
          Clash Royal<br /> (Próximamente)
        </span>
        <span value=''>
          <Image src={lol} alt='logo de League Of Legends' />
          League Of Legends<br /> (Próximamente)
        </span>
      </div>
      <Csgo setToggle={setToggle} toggle={toggle} currentUser={user} teams={mixWikTeams} />
    </section>
  )
}

export default NewTeam
