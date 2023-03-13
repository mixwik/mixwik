import { useState } from 'react'
import styles from './NewPublication.module.scss'

// Images
import clashRoyal from '../../../public/logos/Clash-Royal2.png'
import csgo from '../../../public/logos/csgo.png'
import fortnite from '../../../public/logos/fortnite.png'
import lol from '../../../public/logos/LOL3.png'
import valorant from '../../../public/logos/VALORANT4.png'
import Image from 'next/image'
import { Arrow } from '../../Svg'
import CsgoPublication from './csgo'
import NoMorePublications from './noMorePublications'
import { useMixWikTeamsCheckSubscription } from '../../../hooks/useChecksStripe'

const NewPublication = ({ user }) => {
  const [toggle, setToggle] = useState()
  const [teams, setTeams] = useState(false)
  const mixWikTeams = useMixWikTeamsCheckSubscription(user.mixWikTeams)
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
      <h1 className={styles.title}>Selecciona categoría</h1>
      {
        teams === 'maxPublications' && <p>Has llegado al límite de publicaciones</p>
      }
      <ul className={styles.listOfCategories}>
        <li onClick={() => handleCheck('csgo')}>
          <Image src={csgo} alt='csgo' />
          CSGO
          <Arrow />
        </li>
        <li onClick={() => setToggle('fortnite')}>
          <Image src={fortnite} alt='Fortnite' />
          Fortnite
          <Arrow />
        </li>
        <li onClick={() => setToggle('lol')}>
          <Image src={lol} alt='LOL' />
          League of Legend
          <Arrow />
        </li>
        <li onClick={() => setToggle('valorant')}>
          <Image src={valorant} alt='Valorant' />
          Valorant
          <Arrow />
        </li>
        <li onClick={() => setToggle('cr')}>
          <Image src={clashRoyal} alt='Clash Royal' />
          Clash Royal
          <Arrow />
        </li>
      </ul>
      <NoMorePublications noPremium={teams === 'noMixWikTeams'} currentUser={user} />
      <CsgoPublication toggle={toggle} currentUser={user} />
    </section>
  )
}

export default NewPublication
