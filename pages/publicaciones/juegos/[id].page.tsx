import { useRouter } from 'next/router'
import Layout from '../../../components/Layout'
import UserMap from '../../../components/UserMap'
import { BackgroundDots } from '../../../components/background-dots'
import { useSession } from '../../../firebase/auth/useSession'
import { useGetOneUser } from '../../../hooks/use-get-one-user'
import { useMixWikTeamsCheckSubscription } from '../../../hooks/useChecksStripe'
import { useLimitedAdministrator } from '../../../hooks/useLimitedAdministrator'
import { ImagesCarousel } from '../components/Carousel'
import { useGetGameCategory } from '../hooks/use-get-game-category'

const PublicationsGamesPage = () => {
  const router = useRouter()
  const { userProvider } = useSession()
  const { userServer } = useGetOneUser(userProvider?.uid)
  const mixWikTeams = useMixWikTeamsCheckSubscription(userServer.mixWikTeams)
  const limitedAdministrator = useLimitedAdministrator(userProvider?.uid, userServer.uid)
  const { id, page } = router.query
  const { game } = useGetGameCategory({ id, collection: page })

  const images: {url:string, name:string}[] = []
  game?.img?.url !== undefined && images.push({ url: game?.img?.url || '', name: game?.img?.name || '' })
  game?.img2?.url !== undefined && images.push({ url: game?.img2?.url || '', name: game?.img2?.name || '' })
  game?.img3?.url !== undefined && images.push({ url: game?.img3?.url || '', name: game?.img3?.name || '' })
  game?.img4?.url !== undefined && images.push({ url: game?.img4?.url || '', name: game?.img4?.name || '' })
  game?.img5?.url !== undefined && images.push({ url: game?.img5?.url || '', name: game?.img5?.name || '' })
  game?.img6?.url !== undefined && images.push({ url: game?.img6?.url || '', name: game?.img6?.name || '' })
  game?.img7?.url !== undefined && images.push({ url: game?.img7?.url || '', name: game?.img7?.name || '' })

  return (
    <Layout title='juegos'>
      <section className='flex justify-center h-[90vh]'>
        <BackgroundDots />
        <div className='relative flex flex-col h-full gap-10 overflow-scroll bg-white no-scrollbar md:w-1/2'>
          <div className='sticky top-0 left-0 z-20 flex items-center justify-between gap-2 p-5 bg-white shadow-md'>
            <div className='flex flex-col'>
              <h1 className='flex gap-2 text-xl font-bold'>
                {game?.title}
                <span className='px-2 py-1 text-sm text-white rounded-full bg-aero'>
                  {mixWikTeams && 'Teams'}
                </span>
              </h1>
              <p className='text-sm text-gray-500'>{game?.age} años</p>
            </div>
            {limitedAdministrator && <button className=''>Editar</button>}
          </div>
          <div className='flex flex-col gap-10 p-3 pt-0 md:p-5 md:pt-0'>
            <ImagesCarousel images={images} />
            <p className='text-balance'>{game?.description}</p>
            <div>
              <h2 className='mb-5 text-xl font-bold'>Posiciones</h2>
              <div className='grid grid-cols-4 gap-5'>
                {
                game?.position?.map((level, index) => (
                  <div key={index} className='px-2 py-1 text-center text-white rounded-full shadow-md bg-pennBlue'>
                    <p>{level}</p>
                  </div>
                ))
              }
              </div>
            </div>
            <div className='flex items-center justify-center'>
              {game?.geometry && <UserMap publication={game} />}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
export default PublicationsGamesPage
