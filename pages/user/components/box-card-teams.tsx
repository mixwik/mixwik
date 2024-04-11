import Card from '../../../components/Card'
import { PUBLICATION_TYPE } from '../../../domain/constants'

export const BoxCardsTeams = ({ userServer, publications, title }) => {
  const teams = publications.filter((res) => res.type === PUBLICATION_TYPE.team)
  return (
    <article>
      <h3 className='p-5 pt-10 text-xl font-bold'>
        {
            teams.length > 0 && title
        }
      </h3>
      <div className='grid grid-cols-2 lg:grid-cols-[repeat(auto-fit,_minmax(10rem,1fr))] md:grid-cols-3 place-items-center gap-y-5'>

        {teams?.map((res) => (
          <Card
            key={res.id}
            publication={res}
            userServer={userServer}
            equips
          />
        ))}
      </div>
    </article>
  )
}
