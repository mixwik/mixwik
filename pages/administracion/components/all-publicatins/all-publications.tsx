import { COLLECTIONS } from '../../../../domain/constants'
import { useGetAllPublications } from '../../../../hooks/use-get-all-publications'
import { Pill } from './pill'

export const AllPublications = () => {
  const { publications } = useGetAllPublications()
  const cs2Publications = publications.filter((publication) => publication.category === COLLECTIONS.cs2)
  const fortnitePublications = publications.filter((publication) => publication.category === COLLECTIONS.fortnite)
  const valorantPublications = publications.filter((publication) => publication.category === COLLECTIONS.valorant)
  const roketLeaguePublications = publications.filter((publication) => publication.category === COLLECTIONS.roketLeague)
  const dota2Publications = publications.filter((publication) => publication.category === COLLECTIONS.dota2)
  const leagueOfLegendsPublications = publications.filter((publication) => publication.category === COLLECTIONS.leagueOfLegends)
  return (
    <section className='grid grid-cols-2 gap-5 p-5 bg-white'>
      <Pill number={publications} title='Total publicaciones' className='col-span-2' />
      <Pill number={cs2Publications} title='CS2' />
      <Pill number={fortnitePublications} title='Fortnite' />
      <Pill number={valorantPublications} title='Valorant' />
      <Pill number={leagueOfLegendsPublications} title='League of Legends' />
      <Pill number={roketLeaguePublications} title='Rocket League' />
      <Pill number={dota2Publications} title='Dota 2' />
    </section>
  )
}
