import Image from 'next/image'
import React from 'react'
import { ArrowBack } from '../../../../components/Svg'
import { GAMES } from '../../../../domain/constants'

export const Steps4 = (
  { setSteps }:
  { setSteps: React.Dispatch<React.SetStateAction<string>>}
) => {
  const handleClick = () => {

  }
  const handleCheck = (collection: string) => {

  }

  return (
    <section className='flex flex-col items-center justify-around w-full h-full gap-5 p-5 bg-white rounded-lg md:h-4/5 md:w-1/2'>
      <ul className='grid w-full grid-cols-3'>
        {GAMES.map(game => (
          <li key={game.collection} onClick={() => handleCheck(game.collection)}>
            <Image className='object-cover w-10 h-10' src={game.logo} alt={game.name} />
            {game.name}
            {game.comingSoon && <span>Proximamente</span>}
          </li>
        ))}
      </ul>
      <div className='flex justify-center w-full gap-10'>
        <button
          type='button'
          className='flex items-center gap-1 text-sm md:text-base'
          onClick={() => setSteps('step-3')}
        >
          <ArrowBack className='w-6 h-6 text-white' />
          Volver
        </button>
        <button
          disabled
          onClick={handleClick}
          className='px-5 py-3 text-sm text-white transition duration-500 ease-in-out transform shadow-xl md:text-base bg-pennBlue rounded-xl hover:shadow-inner focus:outline-none hover:-translate-x hover:scale-105 disabled:bg-slate-500'
          type='submit'
        >Guardar y continuar
        </button>
      </div>
    </section>
  )
}
