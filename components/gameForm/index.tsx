import React from 'react'
import { useOpenGameContext } from '../../context'
import { COLLECTIONS } from '../../domain/constants'
import { Cs2GameFrom } from './components/cs2GameForm'

export const GameForm = () => {
  const { openGame } = useOpenGameContext()
  return (
    <section className='flex items-center justify-center bg-white z-10 absolute md:top-[10vh] top-0 bottom-[10vh] md:bottom-0 h-[90vh] w-full overflow-scroll [&::-webkit-scrollbar]:hidden'>
      {openGame === COLLECTIONS.cs2 && <Cs2GameFrom />}
    </section>
  )
}
