import { useOpenGameContext } from '../../context'
import { COLLECTIONS } from '../../domain/constants'
import { Cs2GameFrom } from './components/cs2GameForm'

export const GameForm = () => {
  const { openGame } = useOpenGameContext()
  return (
    <section className='flex flex-col justify-end py-10 gap-10 items-center bg-white z-10 absolute md:top-[10vh] top-0 bottom-[10vh] md:bottom-0 w-full h-[90vh] overflow-scroll'>
      {openGame === COLLECTIONS.cs2 && <Cs2GameFrom />}
    </section>
  )
}
