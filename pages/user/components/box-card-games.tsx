import Card from '../../../components/Card'

export const BoxCardsGames = ({ userServer, games }) => {
  return (
    <article>
      <h3 className='p-5 pt-10 text-xl font-bold'>
        Jugadores Creados
      </h3>
      <div className='grid grid-cols-2 lg:grid-cols-[repeat(auto-fit,_minmax(10rem,1fr))] md:grid-cols-3 place-items-center gap-y-5'>
        {games.map((res) => (
          <Card
            key={res.id}
            publication={res}
            userServer={userServer}
            promotions
          />
        ))}
        {games.map((res) => (
          <Card
            key={res.id}
            publication={res}
            userServer={userServer}
            teams
          />
        ))}
        {games.map((res) => (
          <Card
            key={res.id}
            publication={res}
            userServer={userServer}
            basic
          />
        ))}
      </div>
    </article>
  )
}
