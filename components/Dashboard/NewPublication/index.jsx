import { useState } from 'react'
import styles from './NewPublication.module.scss'
import NoMorePublications from './noMorePublications'

// Images
import Image from 'next/image'
import Link from 'next/link'
import { useCurrentPosition } from '../../../hooks/useCurrentPosition'
import clashRoyal from '../../../public/logos/Clash-Royal2.png'
import lol from '../../../public/logos/LOL3.png'
import valorant from '../../../public/logos/VALORANT4.png'
import csgo from '../../../public/logos/csgo.png'
import fortnite from '../../../public/logos/fortnite.png'
import CsgoPublication from './csgo'
import FortnitePublication from './fortnite'
import LolPublication from './lol'
import ValorantPublication from './valorant'

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
          <Image src={csgo} alt='csgo' />
          Counter Strike Global Offensive
        </li>
        <li onClick={() => setToggle('lol')}>
          <Image src={lol} alt='LOL' />
          League of Legends
        </li>
        <li onClick={() => setToggle('fortnite')}>
          <Image src={fortnite} alt='Fortnite' />
          Fortnite
          <br />
        </li>
        <li onClick={() => setToggle('valorant')}>
          <Image src={valorant} alt='Valorant' />
          Valorant
          <br />
        </li>
        <li onClick={() => setToggle('cr')}>
          <Image src={clashRoyal} alt='Clash Royal' />
          Clash Royal
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
