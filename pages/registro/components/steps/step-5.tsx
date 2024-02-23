import Image from 'next/image'
import React, { useState } from 'react'
import { ArrowBack } from '../../../../components/Svg'
import { GameForm } from '../../../../components/gameForm'
import { useOpenGameContext } from '../../../../context'
import { COLLECTIONS, GAMES } from '../../../../domain/constants'
import { useSession } from '../../../../firebase/auth/useSession'

export const Step5 = (
  { setSteps }:
  { setSteps: React.Dispatch<React.SetStateAction<string>>}
) => {
  const { userProvider } = useSession()
  const { openGame, handleOpenGame } = useOpenGameContext()
  const [playerCreate, setPlayerCreate] = useState(false)

  const handleClick = async () => {
    if (!playerCreate) return
    const geometry = JSON.parse(localStorage.getItem('geometry') ?? '[0,0]')
    const email = localStorage.getItem('email')
    if (userProvider.email !== email) return
    const age = localStorage.getItem('age')
    const name = localStorage.getItem('name')
    const description = localStorage.getItem('description')
    const gender = localStorage.getItem('gender')
    const twitter = localStorage.getItem('twitter')
    const discord = localStorage.getItem('discord')
    const cs2Publications = Number(localStorage.getItem('cs2Publications')) ?? 0
    const fortnitePublications = Number(localStorage.getItem('fortnitePublication')) ?? 0
    const valorantPublications = Number(localStorage.getItem('valorantPublication')) ?? 0
    const lolPublications = Number(localStorage.getItem('lolPublication')) ?? 0
    const RocketLeaguePublication = Number(localStorage.getItem('RocketLeaguePublication')) ?? 0
    const Dota2Publication = Number(localStorage.getItem('Dota2Publication')) ?? 0

    const response = await fetch('/api/create-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        uid: userProvider.uid,
        email,
        geometry,
        age,
        name,
        description,
        gender,
        twitter,
        discord,
        cs2Publications,
        fortnitePublications,
        valorantPublications,
        lolPublications,
        RocketLeaguePublication,
        Dota2Publication
      })
    })
    const data = await response.json()
    console.log(data)
  }
  const handleCheck = (collection: string) => {
    const cs2Publications = localStorage.getItem('cs2Publications')
    const fortnitePublications = localStorage.getItem('fortnitePublications')
    const valorantPublications = localStorage.getItem('valorantPublications')
    const lolPublications = localStorage.getItem('lolPublications')

    if (
      cs2Publications ||
      fortnitePublications ||
      valorantPublications ||
      lolPublications
    ) {
      setPlayerCreate(true)
      return
    }

    handleOpenGame(collection)
  }

  return (
    <section className='flex flex-col items-center justify-around w-full h-full gap-5 p-5 bg-white rounded-lg md:h-4/5 md:w-1/2'>
      <h2 className='text-2xl font-bold text-pennBlue md:text-3xl'>Crea un jugador</h2>
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
          disabled={!playerCreate}
          onClick={handleClick}
          className='px-5 py-3 text-sm text-white transition duration-500 ease-in-out transform shadow-xl md:text-base bg-pennBlue rounded-xl hover:shadow-inner focus:outline-none hover:-translate-x hover:scale-105 disabled:bg-slate-500'
          type='submit'
        >Guardar y continuar
        </button>
      </div>
      {openGame === COLLECTIONS.cs2 && <GameForm />}
      {openGame === COLLECTIONS.valorant && <GameForm />}
      {openGame === COLLECTIONS.lol && <GameForm />}
      {openGame === COLLECTIONS.fortnite && <GameForm />}
    </section>
  )
}
