import { useOpenGameContext } from '../../../context'
import { COLLECTIONS } from '../../../domain/constants'
import { Cs2GameFrom } from './components/cs2-game-form'
import { FortniteGameForm } from './components/fortnite-game-form'
import { LolGameForm } from './components/lol-game-form'
import { ValorantGameFrom } from './components/valorant-game-form'

interface GameFormProps {
  dashboard?: boolean
}

export const GameForm = ({ dashboard }: GameFormProps) => {
  const { openGame } = useOpenGameContext()
  if (!openGame) return null
  return (
    <section className='flex items-center justify-center bg-white z-50 absolute md:top-[10vh] top-0 bottom-[10vh] md:bottom-0 h-[90vh] w-full overflow-scroll [&::-webkit-scrollbar]:hidden'>
      {openGame === COLLECTIONS.cs2 && <Cs2GameFrom dashboard={dashboard} />}
      {openGame === COLLECTIONS.valorant && <ValorantGameFrom dashboard={dashboard} />}
      {openGame === COLLECTIONS.fortnite && <FortniteGameForm dashboard={dashboard} />}
      {openGame === COLLECTIONS.lol && <LolGameForm dashboard={dashboard} />}
    </section>
  )
}
