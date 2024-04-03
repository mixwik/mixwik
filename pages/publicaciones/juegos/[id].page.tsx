import { useRouter } from 'next/router'
import { useState } from 'react'
import Layout from '../../../components/Layout'
import UserMap from '../../../components/UserMap'
import { BackgroundDots } from '../../../components/background-dots'
import { useSession } from '../../../firebase/auth/useSession'
import { useGetOneUser } from '../../../hooks/use-get-one-user'
import { useMixWikTeamsCheckSubscription } from '../../../hooks/useChecksStripe'
import { useLimitedAdministrator } from '../../../hooks/useLimitedAdministrator'
import { ImagesCarousel } from '../components/carousel'
import { Edit } from '../components/edit'
import { Description } from '../components/fields/description'
import { Header } from '../components/fields/header'
import { Player } from '../components/player'
import { Team } from '../components/team'
import { useGetGameCategory } from '../hooks/use-get-game-category'
import { useImages } from '../hooks/use-images'

const PublicationsGamesPage = () => {
  const [edit, setEdit] = useState(false)
  const router = useRouter()
  const { userProvider } = useSession()
  const { id, page } = router.query
  const { publication, setRefetch } = useGetGameCategory({ id, collection: page })
  const { images } = useImages({ publication })
  const { userServer } = useGetOneUser(publication?.uid)
  const limitedAdministrator = useLimitedAdministrator(userProvider?.uid, userServer.uid)
  const mixWikTeams = useMixWikTeamsCheckSubscription(userServer.mixWikTeams)

  if (!publication) return null
  return (
    <Layout title='juegos'>
      <section className='flex justify-center h-[90vh]'>
        <BackgroundDots />
        <div className='relative flex flex-col h-full gap-10 overflow-scroll bg-white no-scrollbar md:w-1/2'>
          <Header
            title={publication?.title}
            image={userServer?.profileImg || userProvider.image}
            age={publication?.age}
            date={publication?.date}
            mixWikTeams={mixWikTeams}
            limitedAdministrator={limitedAdministrator}
            setEdit={setEdit}
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
      {edit &&
        <Edit
          category={publication.category}
          page={page}
          setEdit={setEdit}
          mixWikTeams={mixWikTeams}
          publication={publication}
          setRefetch={setRefetch}
        />}
    </Layout>
  )
}
export default PublicationsGamesPage
