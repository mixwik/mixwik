import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Layout from '../../components/Layout'
import { BackgroundDots } from '../../components/background-dots'
import { myLoader } from '../../components/myLoader'
import { SocialLinks } from '../../components/social-links'
import { useSession } from '../../firebase/auth/useSession'
import { useGetOneUser } from '../../hooks/use-get-one-user'
import { useMixWikTeamsCheckSubscription } from '../../hooks/useChecksStripe'
import { Spinner } from '../../icons/spinner'
import { BoxCardsGames } from './components/box-card-games'
import { BoxCardsTeams } from './components/box-card-teams'
import { ReportPlayer } from './components/report-player'
import { useGetAllGamesAndTeams } from './hooks/use-get-all-games-and-teams'
const User = () => {
  const { userProvider } = useSession()
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { id } = router.query
  const { userServer } = useGetOneUser(id)
  const { publications } = useGetAllGamesAndTeams(id as string)
  const mixWikTeams = useMixWikTeamsCheckSubscription(userServer.mixWikTeams)
  const age = new Date().getFullYear() - new Date(userServer.age).getFullYear()
  setTimeout(() => {
    setLoading(false)
  }, 4000)
  return (
    <Layout title={`perfil de ${userServer.name}`}>
      <div className='relative flex justify-center w-screen'>
        <BackgroundDots />
        {isOpen && <ReportPlayer userServer={userServer} setIsOpen={setIsOpen} />}
        <div className='overflow-scroll md:w-1/2 h-[90vh] no-scrollbar bg-white'>
          <section className='z-10 flex flex-col justify-between w-full bg-white'>
            <div className='sticky top-0 flex items-center justify-between p-3 bg-white shadow-md'>
              <div className='flex gap-2'>
                <Image className='flex object-cover rounded-full size-20' width={0} height={0} loader={myLoader} src={userServer?.profileImg?.url || userProvider.image} alt={userServer?.profileImg?.name} />
                <div className='flex flex-col justify-center gap-2'>
                  <h2 className='font-bold md:text-2xl'>{userServer.name}</h2>
                  <p className='text-xs'>{age} Años</p>
                </div>
              </div>
            </div>
            <p className='p-3'>{userServer.description}</p>
            <section className='flex flex-col items-center p-3'>
              <h2 className='text-xl font-bold text-center'>Redes Sociales</h2>
              <div className='flex flex-wrap justify-center gap-5 p-5'>
                <SocialLinks mixWikTeams={mixWikTeams} user={userServer} />
              </div>
              <button className='w-40 h-10 p-2 font-bold text-center text-white rounded-md bg-pennBlue' onClick={() => setIsOpen(!isOpen)}>
                Reportar Jugador
              </button>
            </section>
          </section>
          <section className='relative z-10 w-full pb-10 bg-white'>
            <h1 className='z-10 px-5 pt-5 text-2xl font-bold text-center'>Publicaciones</h1>
            {
              loading &&
                (
                  <div className='absolute flex items-center justify-center bg-white top-15 size-full'>
                    <Spinner />
                    Cargando Publicaciones...
                  </div>
                )
            }
            {publications.length > 0 && (
              <BoxCardsTeams
                title='Teams creados'
                publications={publications}
                userServer={[userServer]}
              />
            )}
            {publications.length > 0 && (
              <BoxCardsGames
                publications={publications}
                userServer={[userServer]}
              />
            )}
            {(publications.length <= 0) && (
              <div className='flex items-center justify-center h-[50vh]'>
                <p className='text-center'>No hay publicaciones</p>
              </div>
            )}
          </section>
        </div>
      </div>
    </Layout>
  )
}

export default User
