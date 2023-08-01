import { useState } from 'react'
import styles from './NewPublication.module.scss'
import NoMorePublications from './noMorePublications'

import Image from 'next/image'
import Link from 'next/link'
import { LOGOS } from '../../../assets/images'
import { useCurrentPosition } from '../../../hooks/useCurrentPosition'
import CsgoPublication from './GamesForms/cs2'
import FortnitePublication from './GamesForms/fortnite'
import LolPublication from './GamesForms/lol'
import ValorantPublication from './GamesForms/valorant'

const NewPublication = ({ user, mixWikTeams }) => {
  const currentPosition = useCurrentPosition()
  const [toggle, setToggle] = useState()
  const [teams, setTeams] = useState(false)

  const handleCheck = (name) => {
    if (name === 'cs2') {
      if (!mixWikTeams) {
        if (!user.cs2Publications) {
          setToggle(name)
        } else if (user.cs2Publications < 1) {
          setToggle(name)
        } else {
          setTeams('noMixWikTeams')
        }
      } else if (mixWikTeams) {
        if (user.cs2Publications < 5) {
          setToggle(name)
        } else {
          setTeams('maxPublications')
        }
      }
    }
    if (name === 'lol') {
      if (!mixWikTeams) {
        if (!user.lolPublications) {
          setToggle(name)
        } else if (user.lolPublications < 1) {
          setToggle(name)
        } else {
          setTeams('noMixWikTeams')
        }
      } else if (mixWikTeams) {
        if (user.lolPublications < 5) {
          setToggle(name)
        } else {
          setTeams('maxPublications')
        }
      }
    }
    if (name === 'fortnite') {
      if (!mixWikTeams) {
        if (!user.fortnitePublications) {
          setToggle(name)
        } else if (user.fortnitePublications < 1) {
          setToggle(name)
        } else {
          setTeams('noMixWikTeams')
        }
      } else if (mixWikTeams) {
        if (user.fortnitePublications < 5) {
          setToggle(name)
        } else {
          setTeams('maxPublications')
        }
      }
    }
    if (name === 'valorant') {
      if (!mixWikTeams) {
        if (!user.valorantPublications) {
          setToggle(name)
        } else if (user.valorantPublications < 1) {
          setToggle(name)
        } else {
          setTeams('noMixWikTeams')
        }
      } else if (mixWikTeams) {
        if (user.valorantPublications < 5) {
          setToggle(name)
        } else {
          setTeams('maxPublications')
        }
      }
    }
  }
  return (
    <section className={styles.newPublication}>
      <h1 className={styles.title}>Selecciona categoría <Link href='/dashboard?page=publications'>Volver atrás</Link></h1>
      {
        teams === 'maxPublications' && <p>Has llegado al límite de publicaciones</p>
      }
      <ul className={styles.listOfCategories}>
        <li onClick={() => handleCheck('cs2')}>
          <Image src={LOGOS.cs2} alt='counter strike 2' />
          Counter Strike 2
        </li>
        <li onClick={() => handleCheck('lol')}>
          <Image src={LOGOS.lol} alt='LOL' />
          League of Legends
        </li>
        <li onClick={() => handleCheck('fortnite')}>
          <Image src={LOGOS.fortnite} alt='Fortnite' />
          Fortnite
          <br />
        </li>
        <li onClick={() => handleCheck('valorant')}>
          <Image src={LOGOS.valorant} alt='Valorant' />
          Valorant
          <br />
        </li>
        <li onClick={() => handleCheck('rl')}>
          <Image src={LOGOS.rocketLeague} alt='Rocket League' />
          Rocket League
          <br />
          (Próximamente)
        </li>
        <li onClick={() => handleCheck('dota2')}>
          <Image src={LOGOS.dota2} alt='Dota 2' />
          Dota 2
          <br />
          (Próximamente)
        </li>
      </ul>
      <NoMorePublications setTeams={setTeams} noPremium={teams === 'noMixWikTeams'} currentUser={user} />
      <CsgoPublication currentPosition={currentPosition} setTeams={setTeams} teams={mixWikTeams} setToggle={setToggle} toggle={toggle} currentUser={user} />
      <LolPublication currentPosition={currentPosition} setTeams={setTeams} teams={mixWikTeams} setToggle={setToggle} toggle={toggle} currentUser={user} />
      <FortnitePublication currentPosition={currentPosition} setTeams={setTeams} teams={mixWikTeams} setToggle={setToggle} toggle={toggle} currentUser={user} />
      <ValorantPublication currentPosition={currentPosition} setTeams={setTeams} teams={mixWikTeams} setToggle={setToggle} toggle={toggle} currentUser={user} />

    </section>
  )
}

export default NewPublication
