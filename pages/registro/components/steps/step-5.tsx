import Image from 'next/image'
import React from 'react'
import { ArrowBack } from '../../../../components/Svg'
import { GAMES } from '../../../../domain/constants'

export const Step5 = (
  { setSteps }:
  { setSteps: React.Dispatch<React.SetStateAction<string>>}
) => {
  const handleClick = () => {

  }
  const handleCheck = (collection: string) => {

  }

  return (
    <section className='flex flex-col items-center justify-around w-full h-full gap-5 p-5 bg-white rounded-lg md:h-4/5 md:w-1/2'>
      <h2 className='text-2xl font-bold text-pennBlue md:text-3xl'>Crea tu jugador</h2>
      <ul
        className='flex flex-wrap justify-center w-full gap-5 md:gap-10 md:w-4/5'
      >
        {GAMES.map(game => (
          <li
            key={game.collection}
            onClick={() => handleCheck(game.collection)}
            className='flex flex-col items-center justify-center w-32 h-32 p-2 text-xs text-white transition duration-500 ease-in-out transform rounded-lg cursor-pointer bg-pennBlue md:w-36 md:h-36 hover:shadow-xl hover:-translate-y hover:scale-105'
          >
            <Image className='object-cover w-10 h-10' src={game.logo} alt={game.name} />
            <h4 className='text-center'>
              {game.name}
              <br />
              {game.comingSoon && <span>(Proximamente)</span>}
            </h4>
          </li>
        ))}
      </ul>
      <div className='flex justify-center w-full gap-10'>
        <button
          type='button'
          className='flex items-center gap-1 text-sm md:text-base'
          onClick={() => setSteps('step-4')}
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
