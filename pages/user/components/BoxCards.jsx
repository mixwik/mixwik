import Card from '../../../components/Card'

const BoxCards = ({ user, games, teams, title }) => {
  return (
    <article>
      <h3 className='text-xl font-bold'>
        {
            (games.length > 0 || teams.length > 0) && title
        }
      </h3>
      <div className={`grid grid-cols-2 lg:grid-cols-${games.length + teams.length} md:grid-cols-3 place-items-center`}>

        {games.map((res) => (
          <Card
            key={res.id}
            csgo={res}
            user={user}
            promotions
          />
        ))}
        {teams.map((res) => (
          <Card
            key={res.id}
            csgo={res}
            user={user}
            equips
          />
        ))}
        {games.map((res) => (
          <Card
            key={res.id}
            csgo={res}
            user={user}
            teams
          />
        ))}
        {games.map((res) => (
          <Card
            key={res.id}
            csgo={res}
            user={user}
            basic
          />
        ))}
      </div>
    </article>
  )
}

export default BoxCards
