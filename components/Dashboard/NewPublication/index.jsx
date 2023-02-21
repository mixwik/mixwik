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

const NewPublication = ({ user }) => {
  const [toggle, setToggle] = useState()
  return (
    <section className={styles.newPublication}>
      <h1 className={styles.title}>Selecciona categoría</h1>
      <ul>
        <li onClick={() => setToggle('csgo')}>
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
      <CsgoPublication toggle={toggle} setToggle={setToggle} />
    </section>
  )
}

export default NewPublication
