import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { BACKGROUNDS_IMAGES } from '../../assets/images'
import Layout from '../../components/Layout'
import PageLoader from '../../components/Loaders/PageLoader'
import { myLoader } from '../../components/myLoader'
import { SocialLinks } from '../../components/social-links.tsx'
import { COLLECTIONS } from '../../domain/constants'
import { useGetMyPublications } from '../../firebase/hooks/getMethod/useGetMyPublications'
import { useGetMyTeams } from '../../firebase/hooks/getMethod/useGetMyTeam'
import { useGetOneData } from '../../firebase/hooks/getMethod/useGetOneData'
import { useMixWikTeamsCheckSubscription } from '../../hooks/useChecksStripe'
import BoxCards from './components/BoxCards'

const User = () => {
  const [isOpen, setIsOpen] = useState(true)
  const router = useRouter()
  const { id } = router.query
  const user = useGetOneData(COLLECTIONS.users, id)
  const cs2 = useGetMyPublications(COLLECTIONS.cs2, user.uid)
  const lol = useGetMyPublications(COLLECTIONS.lol, user.uid)
  const fortnite = useGetMyPublications(COLLECTIONS.fortnite, user.uid)
  const valorant = useGetMyPublications(COLLECTIONS.valorant, user.uid)
  const teamsCs2 = useGetMyTeams(COLLECTIONS.teams, COLLECTIONS.cs2, id)
  const teamsLol = useGetMyTeams(COLLECTIONS.teams, COLLECTIONS.lol, id)
  const teamsFortnite = useGetMyTeams(COLLECTIONS.teams, COLLECTIONS.fortnite, id)
  const teamsValorant = useGetMyTeams(COLLECTIONS.teams, COLLECTIONS.valorant, id)
  const mixWikTeams = useMixWikTeamsCheckSubscription(user.mixWikTeams)
  if (user.length === 0) return <PageLoader />
  return (
    <Layout>
      <div className='relative flex flex-col-reverse justify-center w-[100vw] md:flex-row'>
        <Image className='absolute top-0 left-0 object-cover w-full h-full' loader={myLoader} src={BACKGROUNDS_IMAGES.backgroundGray} alt='background' />
        <section className='z-10 w-full md:w-[70vw] md:overflow-y-scroll md:h-[90vh] '>
          <h1 className='px-5 pt-5 text-2xl font-bold text-center'>Publicaciones</h1>
          <BoxCards
            title='Counter Strike 2'
            games={cs2}
            teams={teamsCs2}
            user={[user]}
          />
          <BoxCards
            title='League Of Legends'
            games={lol}
            teams={teamsLol}
            user={[user]}
          />
          <BoxCards
            title='Valorant'
            games={valorant}
            teams={teamsValorant}
            user={[user]}
          />
          <BoxCards
            title='Fortnite'
            games={fortnite}
            teams={teamsFortnite}
            user={[user]}
          />
        </section>
        {
        isOpen
          ? (
            <section className='z-10 bg-white w-full md:w-[30vw] flex flex-col justify-between'>
              <div className='flex gap-3 p-3 font-bold text-white bg-aero'>
                <Image className='object-cover w-20 h-20 rounded-full' width={0} height={0} loader={myLoader} src={user.profileImg} alt={user.name} />
                <div className='flex flex-col justify-center gap-2'>
                  <h2>{user.name}</h2>
                  <p>{user.age} Años</p>
                </div>
              </div>
              <p className='p-3'>{user.description}</p>
              <section className='p-3'>
                <h2 className='text-xl font-bold text-center'>Redes Sociales</h2>
                <SocialLinks mixWikTeams={mixWikTeams} user={user} />
              </section>
              <button className='w-full p-2 font-bold text-center text-white bg-pennBlue' onClick={() => setIsOpen(!isOpen)}>
                Reportar Jugador
              </button>
            </section>
            )
          : (
            <section className='z-10 bg-white w-full md:w-[30vw] flex flex-col items-center justify-between gap-5'>
              <div className='flex flex-col gap-5'>
                <h2 className='px-5 pt-5 font-bold'>Reportar Jugador</h2>
                <p className='px-5'>¿<span className='font-bold'>{user.name}</span> ha cometido una infracción o actos reprobables?</p>
                <p className='px-5'>Envía un email a <Link className='font-semibold text-blue-500' href='mailto:infomixwik@gmail.com'>infomixwik@gmail.com</Link> aportando las pruebas de su mala conducta y valoraremos la sanción pertinente</p>
              </div>
              <button className='w-full p-2 font-bold text-white bg-red-500' onClick={() => setIsOpen(!isOpen)}>
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
