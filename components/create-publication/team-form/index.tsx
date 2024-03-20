import { useOpenGameContext } from '../../../context'
import { COLLECTIONS } from '../../../domain/constants'
import { UserServer } from '../../../domain/types'
import { Cs2TeamFrom } from './components/cs2-team-form'
import { FortniteGameForm } from './components/fortnite-game-form'
import { LolGameForm } from './components/lol-game-form'
import { ValorantGameFrom } from './components/valorant-game-form'

interface TeamFormProps {
  userServer: UserServer
  mixWikTeams: boolean
}

export const TeamForm = ({ userServer, mixWikTeams }: TeamFormProps) => {
  const { openGame } = useOpenGameContext()
  if (!openGame) return null
  return (
    <section className='flex items-center justify-center bg-white z-50 absolute md:top-[10vh] top-0 bottom-[10vh] md:bottom-0 h-[90vh] w-full overflow-scroll [&::-webkit-scrollbar]:hidden'>
      {openGame === COLLECTIONS.cs2 && <Cs2TeamFrom userServer={userServer} mixWikTeams={mixWikTeams} />}
      {openGame === COLLECTIONS.valorant && <ValorantGameFrom userServer={userServer} mixWikTeams={mixWikTeams} />}
      {openGame === COLLECTIONS.fortnite && <FortniteGameForm userServer={userServer} mixWikTeams={mixWikTeams} />}
      {openGame === COLLECTIONS.lol && <LolGameForm userServer={userServer} mixWikTeams={mixWikTeams} />}
    </section>
  )
}
