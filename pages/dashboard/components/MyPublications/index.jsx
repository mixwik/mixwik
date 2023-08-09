import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useGetMyPublications } from '../../../../firebase/hooks/getMethod/useGetMyPublications'
import { useGetMyTeams } from '../../../../firebase/hooks/getMethod/useGetMyTeam'
import BoxCards from './BoxCards'
import CardPublications from './CardPublications'

const MyPublications = ({ user }) => {
  const [publications, setPublications] = useState([])
  const publicationsCSGO = useGetMyPublications('cs2', user.uid)
  const publicationsLOL = useGetMyPublications('lol', user.uid)
  const publicationsFortnite = useGetMyPublications('fortnite', user.uid)
  const publicationsValorant = useGetMyPublications('valorant', user.uid)
  const publicationsCsgoTeams = useGetMyTeams('teams', 'cs2', user.uid)
  const publicationsLolTeams = useGetMyTeams('teams', 'lol', user.uid)
  const publicationsFortniteTeams = useGetMyTeams('teams', 'fortnite', user.uid)
  const publicationsValorantTeams = useGetMyTeams('teams', 'valorant', user.uid)

  useEffect(() => {
    setPublications([
      ...publicationsCSGO,
      ...publicationsLOL,
      ...publicationsFortnite,
      ...publicationsValorant,
      ...publicationsCsgoTeams,
      ...publicationsLolTeams,
      ...publicationsFortniteTeams,
      ...publicationsValorantTeams
    ])
  }, [publicationsCSGO, publicationsLOL, publicationsFortnite, publicationsValorant, publicationsCsgoTeams, publicationsLolTeams, publicationsFortniteTeams, publicationsValorantTeams])

  return (
    <section className='h-[95vh] md:h-[90vh]'>
      <h2 className='w-full bg-aero h-[5vh] flex items-center text-white font-bold pl-5 text-2xl'>Mis publicaciones</h2>
      <div className='h-[85vh] bg-white overflow-scroll overflow-x-visible'>
        {
        (publicationsCSGO.length !== 0 || publicationsCsgoTeams.length !== 0) && (
          <BoxCards title='Publicaciones de Counter Strike 2'>
            {
              publicationsCsgoTeams.map((res) => (
                <CardPublications
                  key={res.id}
                  publication={res}
                  user={user}
                  category='teams'
                  deleteCategory='cs2'
                  equip
                  link='cs2'
                />
              ))
            }
            {
              publicationsCSGO.map((res) => (
                <CardPublications
                  key={res.id}
                  publication={res}
                  user={user}
                  category='cs2'
                  link='cs2'
                  deleteCategory='cs2'
                />
              ))
            }
          </BoxCards>
        )
      }
        {
        (publicationsLOL.length !== 0 || publicationsLolTeams.length !== 0) && (
          <BoxCards title='Publicaciones de League Of Legends'>
            {
              publicationsLolTeams.map((res) => (
                <CardPublications
                  key={res.id}
                  publication={res}
                  user={user}
                  category='teams'
                  equip link='lol'
                  deleteCategory='lol'
                />
              ))
            }
            {
              publicationsLOL.map((res) => (
                <CardPublications
                  key={res.id}
                  publication={res}
                  user={user}
                  category='lol'
                  link='lol'
                  deleteCategory='lol'
                />
              ))
            }
          </BoxCards>
        )
      }
        {
        (publicationsFortnite.length !== 0 || publicationsFortniteTeams.length !== 0) && (
          <BoxCards title='Publicaciones de Fortnite'>

            {
              publicationsFortniteTeams.map((res) => (
                <CardPublications
                  key={res.id}
                  publication={res}
                  user={user}
                  category='teams' equip
                  link='fortnite'
                  deleteCategory='fortnite'
                />
              ))
            }
            {
              publicationsFortnite.map((res) => (
                <CardPublications
                  key={res.id}
                  publication={res}
                  user={user}
                  category='fortnite'
                  link='fortnite'
                  deleteCategory='fortnite'
                />
              ))
            }
          </BoxCards>
        )
      }
        {
        (publicationsValorant.length !== 0 || publicationsValorantTeams.length !== 0) && (
          <BoxCards title='Publicaciones de Valorant'>
            {
              publicationsValorantTeams.map((res) => (
                <CardPublications
                  key={res.id}
                  publication={res}
                  user={user}
                  category='teams'
                  teamsCategory='valorant'
                  equip
                  link='valorant'
                  deleteCategory='valorant'
                />
              ))
            }
            {
              publicationsValorant.map((res) => (
                <CardPublications
                  key={res.id}
                  publication={res}
                  user={user}
                  category='valorant'
                  link='valorant'
                  deleteCategory='valorant'
                />
              ))
            }
          </BoxCards>
        )
      }
        {
        publications.length === 0 && (
          <div className='flex flex-col items-center justify-center w-full h-full gap-5 text-center'>
            <h2 className='text-2xl font-bold text-gray-400'>No tienes publicaciones en este momento</h2>
            <Link className='text-2xl font-bold text-blue-500' href='/dashboard?page=publications'>
              Crea una publicación
            </Link>
          </div>
        )
      }
      </div>
    </section>
  )
}

export default MyPublications
