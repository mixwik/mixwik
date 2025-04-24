import { useOpenGameContext } from '../../../context'
import { COLLECTIONS } from '../../../domain/constants'
import { UserServer } from '../../../domain/types'
import { Cs2GameFrom } from './components/cs2-game-form'
import { FortniteGameForm } from './components/fortnite-game-form'
import { LolGameForm } from './components/lol-game-form'
import { RocketLeagueGameFrom } from './components/rocket-game-form'
import { ValorantGameFrom } from './components/valorant-game-form'

interface GameFormProps {
  dashboard?: boolean
  userServer?: UserServer
  isMixWikTeams?: boolean
  createUser?: () => void
}

export const GameForm = ({ userServer, isMixWikTeams, createUser }: GameFormProps) => {
  const { openGame } = useOpenGameContext()
  if (!openGame) return null
  return (
    <section className='flex items-center justify-center bg-white z-50 absolute md:top-[10vh] top-0 bottom-[10vh] md:bottom-0 h-[90vh] w-full overflow-scroll [&::-webkit-scrollbar]:hidden'>
      {openGame === COLLECTIONS.cs2 && <Cs2GameFrom userServer={userServer} isMixWikTeams={isMixWikTeams} createUser={createUser} />}
      {openGame === COLLECTIONS.valorant && <ValorantGameFrom userServer={userServer} isMixWikTeams={isMixWikTeams} createUser={createUser} />}
      {openGame === COLLECTIONS.fortnite && <FortniteGameForm userServer={userServer} isMixWikTeams={isMixWikTeams} createUser={createUser} />}
      {openGame === COLLECTIONS.lol && <LolGameForm userServer={userServer} isMixWikTeams={isMixWikTeams} createUser={createUser} />}
      {openGame === COLLECTIONS.rocketLeague && <RocketLeagueGameFrom userServer={userServer} isMixWikTeams={isMixWikTeams} createUser={createUser} />}
    </section>
  )
}
