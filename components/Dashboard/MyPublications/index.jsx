import { useGetMyPublications } from '../../../firebase/hooks/getMethod/useGetMyPublications'
import { useGetMyTeams } from '../../../firebase/hooks/getMethod/useGetMyTeam'
import BoxCards from './BoxCards'
import CardPublications from './CardPublications'

const MyPublications = ({ user }) => {
  const publicationsCSGO = useGetMyPublications('cs2', user.uid)
  const publicationsLOL = useGetMyPublications('lol', user.uid)
  const publicationsFortnite = useGetMyPublications('fortnite', user.uid)
  const publicationsValorant = useGetMyPublications('valorant', user.uid)
  const publicationsCsgoTeams = useGetMyTeams('teams', 'cs2', user.uid)
  const publicationsLolTeams = useGetMyTeams('teams', 'lol', user.uid)
  const publicationsFortniteTeams = useGetMyTeams('teams', 'fortnite', user.uid)
  const publicationsValorantTeams = useGetMyTeams('teams', 'valorant', user.uid)

  if (!publicationsCSGO) return <div>Loading...</div>
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
      </div>
    </section>
  )
}

export default MyPublications
