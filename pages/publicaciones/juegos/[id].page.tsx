import { useRouter } from 'next/router'
import Layout from '../../../components/Layout'
import UserMap from '../../../components/UserMap'
import { BackgroundDots } from '../../../components/background-dots'
import { useSession } from '../../../firebase/auth/useSession'
import { useGetOneUser } from '../../../hooks/use-get-one-user'
import { useMixWikTeamsCheckSubscription } from '../../../hooks/useChecksStripe'
import { useLimitedAdministrator } from '../../../hooks/useLimitedAdministrator'
import { ImagesCarousel } from '../components/carousel'
import { Description } from '../components/fields/description'
import { Header } from '../components/fields/header'
import { Player } from '../components/player'
import { Team } from '../components/team'
import { useGetGameCategory } from '../hooks/use-get-game-category'
import { useImages } from '../hooks/use-images'

const PublicationsGamesPage = () => {
  const router = useRouter()
  const { userProvider } = useSession()
  const { userServer } = useGetOneUser(userProvider?.uid)
  const mixWikTeams = useMixWikTeamsCheckSubscription(userServer.mixWikTeams)
  const limitedAdministrator = useLimitedAdministrator(userProvider?.uid, userServer.uid)
  const { id, page } = router.query
  const { publication } = useGetGameCategory({ id, collection: page })
  const { images } = useImages({ publication })

  if (!publication) return null
  return (
    <Layout title='juegos'>
      <section className='flex justify-center h-[90vh]'>
        <BackgroundDots />
        <div className='relative flex flex-col h-full gap-10 overflow-scroll bg-white no-scrollbar md:w-1/2'>
          <Header
            title={publication?.title}
            age={publication?.age}
            date={publication?.date}
            mixWikTeams={mixWikTeams}
            limitedAdministrator={limitedAdministrator}
          />
          <div className='flex flex-col gap-10 p-3 pt-0 md:p-5 md:pt-0'>
            <ImagesCarousel images={images} />
            <Description description={publication?.description} />
            <Team field={publication} page={page} />
            <Player field={publication} page={page} />
            <div className='flex items-center justify-center'>
              {publication?.geometry && <UserMap publication={publication} />}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
export default PublicationsGamesPage
