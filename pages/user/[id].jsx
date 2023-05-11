import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Card from '../../components/Card'
import Layout from '../../components/Layout'
import { myLoader } from '../../components/myLoader'
import { useGetMyPublications } from '../../firebase/hooks/getMethod/useGetMyPublications'
import { useGetOneData } from '../../firebase/hooks/getMethod/useGetOneData'
import discord from '../../public/logos/discord.png'
import facebook from '../../public/logos/facebook.png'
import instagram from '../../public/logos/instagram.png'
import twitch from '../../public/logos/twitch.webp'
import twitter from '../../public/logos/twitter.png'
import youtube from '../../public/logos/youtube.png'
import styles from './User.module.scss'

const User = () => {
  const [isOpen, setIsOpen] = useState(true)
  const router = useRouter()
  const { id } = router.query
  const user = useGetOneData('users', id)
  const csgo = useGetMyPublications('csgo', user.uid)
  const teams = useGetMyPublications('teams', user.uid)
  if (user.length === 0) return <div>Loading...</div>
  return (
    <Layout>
      <div className={styles.user}>
        <section className={styles.publications}>
          <h2>Publicaciones</h2>
          <div className={styles.publicationsBox}>
            {csgo.length > 0 && (
              csgo.map((res) => (
                <Card key={res.id} csgo={res} user={[user]} link='csgo' promotions />
              ))
            )}
            {teams.length > 0 && (
              teams.map((res) => (
                <Card key={res.id} csgo={res} user={[user]} link='csgo' equips />
              ))
            )}
            {csgo.length > 0 && (
              csgo.map((res) => (
                <Card key={res.id} csgo={res} user={[user]} link='csgo' teams />
              ))
            )}
            {csgo.length > 0 && (
              csgo.map((res) => (
                <Card key={res.id} csgo={res} user={[user]} link='csgo' basic />
              ))
            )}
          </div>
        </section>
        {
        isOpen
          ? (
            <section className={styles.userData}>
              <div className={styles.imageNameAge}>
                <Image width={0} height={0} loader={myLoader} src={user.profileImg} alt={user.name} />
                <div>
                  <h1>{user.name}</h1>
                  <p>{user.age} Años</p>
                </div>
              </div>
              <p className={styles.description}>{user.description}</p>
              <section className={styles.social}>
                <h2>Redes Sociales</h2>
                <div className={styles.socialLinks}>
                  {user.social.discord && (
                    <a href={user.social.discord} target='_blank' rel='noreferrer'><Image width={0} height={0} loader={myLoader} src={discord} alt='Logo de Discord' />Discord</a>
                  )}
                  {user.social.twitter && (
                    <a href={user.social.twitter} target='_blank' rel='noreferrer'><Image width={0} height={0} loader={myLoader} src={twitter} alt='Logo de Twitter' />Twitter</a>
                  )}
                  {user.social.twitch && (
                    <a href={user.social.twitch} target='_blank' rel='noreferrer'><Image width={0} height={0} loader={myLoader} src={twitch} alt='Logo de Twitch' />Twitch</a>
                  )}
                  {user.social.youtube && (
                    <a href={user.social.youtube} target='_blank' rel='noreferrer'><Image width={0} height={0} loader={myLoader} src={youtube} alt='Logo de Youtube' />Youtube</a>
                  )}
                  {user.social.instagram && (
                    <a href={user.social.instagram} target='_blank' rel='noreferrer'><Image width={0} height={0} loader={myLoader} src={instagram} alt='Logo de Instagram' />Instagram</a>
                  )}
                  {user.social.facebook && (
                    <a href={user.social.facebook} target='_blank' rel='noreferrer'><Image width={0} height={0} loader={myLoader} src={facebook} alt='Logo de Facebook' />Facebook</a>
                  )}
                </div>
              </section>
              <button onClick={() => setIsOpen(!isOpen)} className={styles.reportButton}>
                Reportar Jugador
              </button>
            </section>
            )
          : (
            <section className={styles.reportedUser}>
              <h1>Reportar Jugador</h1>
              <p>¿<span>{user.name}</span> ha cometido una infracción o actos reprobables?</p>
              <p>Envía un email a <Link href='mailto:infomixwik@gmail.com'>infomixwik@gmail.com</Link> aportando las pruebas de su mala conducta y valoraremos la sanción pertinente</p>
              <button onClick={() => setIsOpen(!isOpen)} className={styles.reportButton}>
                Cancelar Reporte
              </button>
            </section>
            )
         }
      </div>
    </Layout>
  )
}

export default User
