import { useState } from 'react'
import styles from './NewPublication.module.scss'
import NoMorePublications from './noMorePublications'

import Image from 'next/image'
import Link from 'next/link'
import { LOGOS } from '../../../assets/images'
import { COLLECTIONS } from '../../../domain/constants'
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
    if (name === COLLECTIONS.cs2) {
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
    if (name === COLLECTIONS.lol) {
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
    if (name === COLLECTIONS.fortnite) {
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
    if (name === COLLECTIONS.valorant) {
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
      <ul className={styles.listOfCategories}>
        <li onClick={() => handleCheck(COLLECTIONS.cs2)}>
          <Image src={LOGOS.cs2} alt='counter strike 2' />
          Counter Strike 2
        </li>
        <li onClick={() => handleCheck(COLLECTIONS.lol)}>
          <Image src={LOGOS.lol} alt='LOL' />
          League of Legends
        </li>
        <li onClick={() => handleCheck(COLLECTIONS.fortnite)}>
          <Image src={LOGOS.fortnite} alt='Fortnite' />
          Fortnite
          <br />
        </li>
        <li onClick={() => handleCheck(COLLECTIONS.valorant)}>
          <Image src={LOGOS.valorant} alt='Valorant' />
          Valorant
          <br />
        </li>
        <li onClick={() => handleCheck(COLLECTIONS.rocketLeague)}>
          <Image src={LOGOS.rocketLeague} alt='Rocket League' />
          Rocket League
          <br />
          (Próximamente)
        </li>
        <li onClick={() => handleCheck(COLLECTIONS.dota2)}>
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
