import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Carousel } from 'react-responsive-carousel'
import Layout from '../../../components/Layout'
import UserMap from '../../../components/UserMap'
import { BackgroundDots } from '../../../components/background-dots'
import { myLoader } from '../../../components/myLoader'
import { SocialLinks } from '../../../components/social-links'
import { useSession } from '../../../firebase/auth/useSession'
import { useGetOneUser } from '../../../hooks/use-get-one-user'
import { useMixWikTeamsCheckSubscription } from '../../../hooks/useChecksStripe'
import { useLimitedAdministrator } from '../../../hooks/useLimitedAdministrator'
import { Edit } from '../components/edit'
import { Description } from '../components/fields/description'
import { Header } from '../components/fields/header'
import { Title } from '../components/fields/title'
import { Player } from '../components/player'
import { Team } from '../components/team'
import { useGetGameCategory } from '../hooks/use-get-game-category'
import { useImages } from '../hooks/use-images'
import styles from './Carouse.module.scss'

const PublicationsGamesPage = () => {
  const [edit, setEdit] = useState(false)
  const router = useRouter()
  const { userProvider } = useSession()
  const { id, type, category } = router.query
  const { publication, setRefetch } = useGetGameCategory({ id, category })
  const { images } = useImages({ publication })
  const { userServer } = useGetOneUser(publication?.uid)
  const { isData } = useGetOneUser(userProvider?.uid)
  const limitedAdministrator = useLimitedAdministrator(userProvider?.uid, userServer.uid)
  const { isMixWikTeams } = useMixWikTeamsCheckSubscription(userServer.mixWikTeams)

  if (!publication) return null
  return (
    <Layout title='juegos'>
      <section className='flex justify-center h-[90vh]'>
        <BackgroundDots />
        <div className='relative flex flex-col h-full gap-10 overflow-scroll bg-white no-scrollbar md:w-1/2'>
          <Header
            userServer={userServer}
            image={userServer?.profileImg?.url || userProvider.image}
            age={publication?.age}
            date={publication?.date}
            isMixWikTeams={isMixWikTeams}
            limitedAdministrator={limitedAdministrator}
            setEdit={setEdit}
            uid={userProvider?.uid}
            id={id}
          />
          <div className='flex flex-col gap-10 p-3 pt-0 md:p-5 md:pt-0'>
            <div className={styles.imgBox}>
              <Carousel
                className={styles.carousel}
                showStatus={false}
                showThumbs={false}
              >
                {
                images
                  .filter(image => image?.url !== '')
                  .map((image, index) => (
                    <Image key={index} loader={myLoader} width={100} height={100} src={image?.url} alt={image?.name} />
                  ))
                }
              </Carousel>
            </div>
            <Title title={publication?.title} />
            <Description description={publication?.description} />
            <Team field={publication} type={type} />
            <Player field={publication} type={type} />
            <h2 className='text-xl font-bold'>Vias de contacto</h2>
            <div className='flex flex-wrap gap-5'>
              {isData === 'data'
                ? <SocialLinks isMixWikTeams={isMixWikTeams} user={userServer} />
                : <p>Para poder ver las vías de contacto, primero tienes que <Link className='text-aero decoration-white' href='/logIn?#'>Registrarte / Iniciar Sesión en MixWik</Link></p>}
            </div>
            <div className='flex items-center justify-center'>
              {publication?.geometry && <UserMap publication={publication} />}
            </div>
          </div>
        </div>
      </section>
      {edit &&
        <Edit
          type={type}
          setEdit={setEdit}
          isMixWikTeams={isMixWikTeams}
          publication={publication}
          setRefetch={setRefetch}
        />}
    </Layout>
  )
}
export default PublicationsGamesPage
