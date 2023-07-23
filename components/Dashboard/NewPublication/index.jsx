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
    if (name === 'csgo') {
      if (!mixWikTeams) {
        if (!user.csgoPublications) {
          setToggle(name)
        } else if (user.CsgoPublication <= 1) {
          setToggle(name)
        } else {
          setTeams('noMixWikTeams')
        }
      } else if (mixWikTeams) {
        if (user.csgoPublications <= 5) {
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
        <li onClick={() => handleCheck('csgo')}>
          <Image src={LOGOS.cs2} alt='csgo' />
          Counter Strike 2
        </li>
        <li onClick={() => setToggle('lol')}>
          <Image src={LOGOS.lol} alt='LOL' />
          League of Legends
        </li>
        <li onClick={() => setToggle('fortnite')}>
          <Image src={LOGOS.fortnite} alt='Fortnite' />
          Fortnite
          <br />
        </li>
        <li onClick={() => setToggle('valorant')}>
          <Image src={LOGOS.valorant} alt='Valorant' />
          Valorant
          <br />
        </li>
        <li onClick={() => setToggle('rl')}>
          <Image src={LOGOS.rocketLeague} alt='Rocket League' />
          Rocket League
          <br />
          (Próximamente)
        </li>
        <li onClick={() => setToggle('dota2')}>
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
