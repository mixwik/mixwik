import Link from 'next/link'
import { useEffect, useState } from 'react'
import { COLLECTIONS } from '../../../../domain/constants'
import { useGetMyPublications } from '../../../../firebase/hooks/getMethod/useGetMyPublications'
import { useGetMyTeams } from '../../../../firebase/hooks/getMethod/useGetMyTeam'
import CardPublications from '../CardPublications'
import { Title } from '../title'
import { WindowLayout } from '../window-layout'
import BoxCards from './BoxCards'

const MyPublications = ({ user }) => {
  const [publications, setPublications] = useState([])
  const publicationsCSGO = useGetMyPublications(COLLECTIONS.cs2, user.uid)
  const publicationsLOL = useGetMyPublications(COLLECTIONS.lol, user.uid)
  const publicationsFortnite = useGetMyPublications(COLLECTIONS.fortnite, user.uid)
  const publicationsValorant = useGetMyPublications(COLLECTIONS.valorant, user.uid)
  const publicationsCsgoTeams = useGetMyTeams(COLLECTIONS.teams, COLLECTIONS.cs2, user.uid)
  const publicationsLolTeams = useGetMyTeams(COLLECTIONS.teams, COLLECTIONS.lol, user.uid)
  const publicationsFortniteTeams = useGetMyTeams(COLLECTIONS.teams, COLLECTIONS.fortnite, user.uid)
  const publicationsValorantTeams = useGetMyTeams(COLLECTIONS.teams, COLLECTIONS.valorant, user.uid)

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
    <WindowLayout>
      <Title title='Mis publicaciones' />
      <div className='flex flex-wrap h-full gap-10 p-10'>
        {
        (publicationsCSGO.length !== 0 || publicationsCsgoTeams.length !== 0) && (
          <BoxCards title='Counter Strike 2'>
            {
              publicationsCsgoTeams.map((res) => (
                <CardPublications
                  key={res.id}
                  publication={res}
                  user={user}
                  remove
                  equip
                />
              ))
            }
            {
              publicationsCSGO.map((res) => (
                <CardPublications
                  key={res.id}
                  publication={res}
                  user={user}
                  remove
                  deleteCategory={COLLECTIONS.cs2}
                />
              ))
            }
          </BoxCards>
        )
      }
        {
        (publicationsLOL.length !== 0 || publicationsLolTeams.length !== 0) && (
          <BoxCards title='League Of Legends'>
            {
              publicationsLolTeams.map((res) => (
                <CardPublications
                  key={res.id}
                  publication={res}
                  user={user}
                  remove
                  equip
                />
              ))
            }
            {
              publicationsLOL.map((res) => (
                <CardPublications
                  key={res.id}
                  publication={res}
                  user={user}
                  remove
                />
              ))
            }
          </BoxCards>
        )
      }
        {
        (publicationsFortnite.length !== 0 || publicationsFortniteTeams.length !== 0) && (
          <BoxCards title='Fortnite'>

            {
              publicationsFortniteTeams.map((res) => (
                <CardPublications
                  key={res.id}
                  publication={res}
                  user={user}
                  remove
                  equip
                />
              ))
            }
            {
              publicationsFortnite.map((res) => (
                <CardPublications
                  key={res.id}
                  publication={res}
                  user={user}
                  remove
                />
              ))
            }
          </BoxCards>
        )
      }
        {
        (publicationsValorant.length !== 0 || publicationsValorantTeams.length !== 0) && (
          <BoxCards title='Valorant'>
            {
              publicationsValorantTeams.map((res) => (
                <CardPublications
                  key={res.id}
                  publication={res}
                  user={user}
                  remove
                  equip
                />
              ))
            }
            {
              publicationsValorant.map((res) => (
                <CardPublications
                  key={res.id}
                  publication={res}
                  user={user}
                  remove
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
            <Link className='text-2xl font-bold text-aero' href='/dashboard?page=jugador'>
              Crea un jugador
            </Link>
            <Link className='text-2xl font-bold text-aero' href='/dashboard?page=teams'>
              Crea un team
            </Link>
          </div>
        )
      }
      </div>
    </WindowLayout>
  )
}

export default MyPublications
