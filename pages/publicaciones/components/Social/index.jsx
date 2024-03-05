import Link from 'next/link'
import SocialLinks from '../../../../components/SocialLinks'
import { EditIcon } from '../../../../components/Svg'
import styles from './Social.module.scss'

const Social = ({ publicationUser, mixWikTeams, limitedAdministrator }) => {
  return (
    (publicationUser.social?.discord !== '' ||
    publicationUser.social?.instagram !== '' ||
    publicationUser.social?.twitter !== '' ||
    publicationUser.social?.youtube !== '' ||
    publicationUser.social?.facebook !== '' ||
    publicationUser.social?.twitch !== '') &&
            (
              <article className={styles.social}>
                <h2>
                  Vías de contacto:
                  {limitedAdministrator && <Link href='/dashboard' target='_blank' className={styles.editButtonImages}><EditIcon /></Link>}
                </h2>
                <SocialLinks mixWikTeams={mixWikTeams} user={publicationUser} />
              </article>
            )
  )
}

export default Social
