
import { UserServer } from '../domain/types'
import { DiscordIcon } from '../icons/social/discord'
import { FacebookIcon } from '../icons/social/facebook'
import { InstagramIcon } from '../icons/social/instagram'
import { TikTokIcon } from '../icons/social/tik-tok'
import { TwitchIcon } from '../icons/social/twitch'
import { TwitterIcon } from '../icons/social/twitter'
import { YoutubeIcon } from '../icons/social/youtube'

interface SocialLinksProps {
  user: UserServer
  isMixWikTeams?: boolean
}

export const SocialLinks = ({ user, isMixWikTeams }: SocialLinksProps) => {
  return (
    <>
      {user.social?.discord && (
        <a className='flex flex-col items-center text-sm' href={user.social.discord} target='_blank' rel='noreferrer'>
          <DiscordIcon className='size-6' />
          Discord
        </a>
      )}
      {user.social?.twitter && (
        <a className='flex flex-col items-center text-sm' href={user.social.twitter} target='_blank' rel='noreferrer'>
          <TwitterIcon className='size-6' />
          Twitter
        </a>
      )}
      {
        isMixWikTeams && (
          <>
            {user.social?.instagram && (
              <a className='flex flex-col items-center text-sm' href={user.social.instagram} target='_blank' rel='noreferrer'>
                <InstagramIcon className='size-6' />
                Instagram
              </a>
            )}
            {user.social?.twitch && (
              <a className='flex flex-col items-center text-sm' href={user.social.twitch} target='_blank' rel='noreferrer'>
                <TwitchIcon className='size-6' />
                Twitch
              </a>
            )}
            {user.social?.youtube && (
              <a className='flex flex-col items-center text-sm' href={user.social.youtube} target='_blank' rel='noreferrer'>
                <YoutubeIcon className='size-6' />
                YouTube
              </a>
            )}
            {user.social?.tiktok && (
              <a className='flex flex-col items-center text-sm' href={user.social.twitter} target='_blank' rel='noreferrer'>
                <TikTokIcon className='size-6' />
                TikTok
              </a>
            )}
            {user.social?.facebook && (
              <a className='flex flex-col items-center text-sm' href={user.social.facebook} target='_blank' rel='noreferrer'>
                <FacebookIcon className='size-6' />
                Facebook
              </a>
            )}
          </>
        )
            }
    </>
  )
}
