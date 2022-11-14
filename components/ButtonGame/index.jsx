// Styles
import styles from './ButtonGame.module.scss'

// Next Component
import Image from 'next/image'

// images
import clashRoyal from '../../public/logos/Clash-Royal2.png'
import csgo from '../../public/logos/csgo.png'
import fornite from '../../public/logos/fortnite.png'
import lol from '../../public/logos/LOL3.png'
import roquet from '../../public/logos/rocket.png'
import minecraft from '../../public/logos/Minecraft2.png'
import Link from 'next/link'

const games = [{
  image: csgo,
  title: 'Counter Strike Global Offensive',
  alt: 'Icono del videojugo csgo',
  available: true,
  link: 'csgo'
}, {
  image: clashRoyal,
  title: 'Clash Royal',
  alt: 'Icono del videojugo Clash Royal',
  available: false,
  link: ''
}, {
  image: fornite,
  title: 'Fornite',
  alt: 'Icono del videojugo Fornite',
  available: false,
  link: ''
}, {
  image: lol,
  title: 'League of Legends',
  alt: 'Icono del videojugo League of Legends',
  available: false,
  link: ''
}, {
  image: roquet,
  title: 'Rocket League',
  alt: 'Icono del videojugo Rocket League',
  available: false,
  link: ''
}, {
  image: minecraft,
  title: 'Minecraft',
  alt: 'Icono del videojugo Minecraft',
  available: false,
  link: ''
}]

const ButtonGame = () => {
  return (
    games.map(({ image, title, alt, available, link }) => (
      <Link key={title} href={link}>
        <div className={styles.buttonGame}>
          <div className={styles.image}>
            <Image width={60} src={image} alt={alt} />
          </div>
          <span>{title}</span>
          <div className={available ? styles.available : styles.unavailable}>
            <span>Próximamente</span>
          </div>
        </div>
      </Link>
    ))
  )
}

export default ButtonGame
