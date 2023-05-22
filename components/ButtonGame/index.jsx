// Styles
import styles from './ButtonGame.module.scss'

// Next Component
import Image from 'next/image'
import Link from 'next/link'

// images
import clashRoyal from '../../public/logos/Clash-Royal2.png'
import csgo from '../../public/logos/csgo.png'
import fortnite from '../../public/logos/fortnite.png'
import lol from '../../public/logos/LOL3.png'
import valorant from '../../public/logos/VALORANT4.png'

const games = [{
  image: csgo,
  title: 'CSGO',
  alt: 'Icono del videojuego csgo',
  link: 'csgo'
}, {
  image: lol,
  title: 'League of Legends',
  alt: 'Icono del videojuego League of Legends',
  link: 'lol'
}, {
  image: fortnite,
  title: 'Fortnite',
  alt: 'Icono del videojuego Fornite',
  link: 'fortnite'
}, {
  image: clashRoyal,
  title: 'Clash Royal',
  alt: 'Icono del videojuego Clash Royal',
  link: 'proximamente'
}, {
  image: valorant,
  title: 'Valorant',
  alt: 'Icono del videojuego Valorant',
  link: 'proximamente'
}]

const ButtonGame = () => {
  return (
    games.map(({ image, title, alt, available, link }) => (
      <Link key={title} href={link}>
        <div className={styles.buttonGame}>
          <Image width={60} src={image} alt={alt} />
          <span>{title}</span>
        </div>
      </Link>
    ))
  )
}

export default ButtonGame
