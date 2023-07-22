import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { LOGOS } from '../../../assets/images'
import Csgo from './Csgo'
import Fortnite from './Fortnite'
import Lol from './Lol'
import styles from './NewTeam.module.scss'
import Valorant from './Valorant'

const NewTeam = ({ user, mixWikTeams }) => {
  const [toggle, setToggle] = useState('nav')
  return (
    <section className={styles.newTeam}>
      <h1 className={styles.title}>Selecciona categoría <Link href='/dashboard?page=publications'>Volver atrás</Link></h1>
      <div className={styles.selectCategory} onChange={(e) => setToggle(e.target.value)}>
        <span onClick={() => setToggle('csgo')}>
          <Image src={LOGOS.cs2} alt='logo de csgo' />
          Counter Strike 2
        </span>
        <span onClick={() => setToggle('lol')}>
          <Image src={LOGOS.lol} alt='logo de League Of Legends' />
          League Of Legends<br />
        </span>
        <span onClick={() => setToggle('fortnite')}>
          <Image src={LOGOS.fortnite} alt='logo de Fortnite' />
          Fortnite<br />
        </span>
        <span onClick={() => setToggle('valorant')}>
          <Image src={LOGOS.valorant} alt='logo de Valorant' />
          Valorant<br />
        </span>
        <span>
          <Image src={LOGOS.rocketLeague} alt='logo de Rocket League' />
          Rocket League<br /> (Próximamente)
        </span>
        <span>
          <Image src={LOGOS.dota2} alt='logo de Dota 2' />
          Dota 2<br /> (Próximamente)
        </span>
      </div>
      <Csgo setToggle={setToggle} toggle={toggle} currentUser={user} teams={mixWikTeams} />
      <Lol setToggle={setToggle} toggle={toggle} currentUser={user} teams={mixWikTeams} />
      <Fortnite setToggle={setToggle} toggle={toggle} currentUser={user} teams={mixWikTeams} />
      <Valorant setToggle={setToggle} toggle={toggle} currentUser={user} teams={mixWikTeams} />
    </section>
  )
}

export default NewTeam
