import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { LOGOS } from '../../../assets/images'
import styles from './NewTeam.module.scss'
import Csgo from './TeamsForms/Cs2'
import Fortnite from './TeamsForms/Fortnite'
import Lol from './TeamsForms/Lol'
import Valorant from './TeamsForms/Valorant'

const NewTeam = ({ user, mixWikTeams }) => {
  const [toggle, setToggle] = useState('nav')
  const [teams, setTeams] = useState(false)
  const handleCheck = (name) => {
    if (name === 'cs2') {
      if (mixWikTeams) {
        if (user.cs2Publications < 5) {
          setToggle(name)
        } else {
          setTeams('maxPublications')
        }
      }
    }
    if (name === 'lol') {
      if (mixWikTeams) {
        if (user.lolPublications < 5) {
          setToggle(name)
        } else {
          setTeams('maxPublications')
        }
      }
    }
    if (name === 'fortnite') {
      if (mixWikTeams) {
        if (user.fortnitePublications < 5) {
          setToggle(name)
        } else {
          setTeams('maxPublications')
        }
      }
    }
    if (name === 'valorant') {
      if (mixWikTeams) {
        if (user.valorantPublications < 5) {
          setToggle(name)
        } else {
          setTeams('maxPublications')
        }
      }
    }
  }

  return (
    <section className={styles.newTeam}>
      <h1 className={styles.title}>
        <Link href='/dashboard?page=publications'>
          <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-10 h-10 font-bold'>
            <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75' />
          </svg>
        </Link>
        Selecciona categoría
      </h1>
      {
        teams === 'maxPublications' && <p>Has llegado al límite de publicaciones</p>
      }
      <div className={styles.selectCategory} onChange={(e) => setToggle(e.target.value)}>
        <span onClick={() => handleCheck('cs2')}>
          <Image src={LOGOS.cs2} alt='logo de csgo' />
          Counter Strike 2
        </span>
        <span onClick={() => handleCheck('lol')}>
          <Image src={LOGOS.lol} alt='logo de League Of Legends' />
          League Of Legends<br />
        </span>
        <span onClick={() => handleCheck('fortnite')}>
          <Image src={LOGOS.fortnite} alt='logo de Fortnite' />
          Fortnite<br />
        </span>
        <span onClick={() => handleCheck('valorant')}>
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
