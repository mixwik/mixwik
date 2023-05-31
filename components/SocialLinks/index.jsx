import Image from 'next/image'
import discord from '../../public/logos/discord.png'
import facebook from '../../public/logos/facebook.png'
import instagram from '../../public/logos/instagram.png'
import twitch from '../../public/logos/twitch.webp'
import twitter from '../../public/logos/twitter.png'
import youtube from '../../public/logos/youtube.png'
import { myLoader } from '../myLoader'
import styles from './SociaLinks.module.scss'

const SocialLinks = ({ user, mixWikTeams }) => {
  return (
    <div className={styles.socialLinks}>
      {user.social?.discord && (
        <a href={user.social.discord} target='_blank' rel='noreferrer'><Image width={0} height={0} loader={myLoader} src={discord} alt='Logo de Discord' />Discord</a>
      )}
      {user.social?.instagram && (
        <a href={user.social.instagram} target='_blank' rel='noreferrer'><Image width={0} height={0} loader={myLoader} src={instagram} alt='Logo de Instagram' />Instagram</a>
      )}
      {
        mixWikTeams && (
          <>
            {user.social?.twitch && (
              <a href={user.social.twitch} target='_blank' rel='noreferrer'><Image width={0} height={0} loader={myLoader} src={twitch} alt='Logo de Twitch' />Twitch</a>
            )}
            {user.social?.youtube && (
              <a href={user.social.youtube} target='_blank' rel='noreferrer'><Image width={0} height={0} loader={myLoader} src={youtube} alt='Logo de Youtube' />Youtube</a>
            )}
            {user.social?.twitter && (
              <a href={user.social.twitter} target='_blank' rel='noreferrer'><Image width={0} height={0} loader={myLoader} src={twitter} alt='Logo de Twitter' />Twitter</a>
            )}
            {user.social?.facebook && (
              <a href={user.social.facebook} target='_blank' rel='noreferrer'><Image width={0} height={0} loader={myLoader} src={facebook} alt='Logo de Facebook' />Facebook</a>
            )}
          </>
        )
            }
    </div>
  )
}

export default SocialLinks
