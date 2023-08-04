import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Layout from '../../components/Layout'
import PageLoader from '../../components/Loaders/PageLoader'
import SocialLinks from '../../components/SocialLinks'
import { myLoader } from '../../components/myLoader'
import { COLLECTIONS } from '../../domain/constants'
import { useGetMyPublications } from '../../firebase/hooks/getMethod/useGetMyPublications'
import { useGetOneData } from '../../firebase/hooks/getMethod/useGetOneData'
import { useGetTeams } from '../../firebase/hooks/getMethod/useGetTeams'
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
  const teamsCs2 = useGetTeams(COLLECTIONS.teams, COLLECTIONS.cs2)
  const teamsLol = useGetTeams(COLLECTIONS.teams, COLLECTIONS.lol)
  const teamsFortnite = useGetTeams(COLLECTIONS.teams, COLLECTIONS.fortnite)
  const teamsValorant = useGetTeams(COLLECTIONS.teams, COLLECTIONS.valorant)
  const mixWikTeams = useMixWikTeamsCheckSubscription(user.mixWikTeams)
  if (user.length === 0) return <PageLoader />
  return (
    <Layout>
      <div className='flex flex-col-reverse justify-center w-[100vw] md:flex-row'>
        <section className='w-full md:w-[70vw] bg-red-200 md:overflow-y-scroll h-[90vh]'>
          <h2 className='text-2xl font-bold'>Publicaciones</h2>
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
            <section className='bg-white'>
              <div className='flex gap-3 p-3 bg-aero'>
                <Image className='object-cover w-20 h-20 rounded-full' width={0} height={0} loader={myLoader} src={user.profileImg} alt={user.name} />
                <div className='flex flex-col justify-center gap-2'>
                  <h1>{user.name}</h1>
                  <p>{user.age} Años</p>
                </div>
              </div>
              <p className='p-3'>{user.description}</p>
              <section className='p-3'>
                <h2>Redes Sociales</h2>
                <SocialLinks mixWikTeams={mixWikTeams} user={user} />
              </section>
              <button onClick={() => setIsOpen(!isOpen)}>
                Reportar Jugador
              </button>
            </section>
            )
          : (
            <section>
              <h1>Reportar Jugador</h1>
              <p>¿<span>{user.name}</span> ha cometido una infracción o actos reprobables?</p>
              <p>Envía un email a <Link href='mailto:infomixwik@gmail.com'>infomixwik@gmail.com</Link> aportando las pruebas de su mala conducta y valoraremos la sanción pertinente</p>
              <button onClick={() => setIsOpen(!isOpen)}>
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
