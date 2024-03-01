import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { ArrowBack } from '../../../../components/Svg'
import { GameForm } from '../../../../components/gameForm'
import { PopUpError } from '../../../../components/pop-up-error'
import { PopUpMessage } from '../../../../components/pop-up-message'
import { useOpenGameContext, usePlayerCreateContext } from '../../../../context'
import { COLLECTIONS, GAMES } from '../../../../domain/constants'
import { useSession } from '../../../../firebase/auth/useSession'
import { useCheckPublications } from '../../hooks/use-check-publication'

export const Step5 = (
  { setSteps }:
  { setSteps: React.Dispatch<React.SetStateAction<string>>}
) => {
  const { userProvider } = useSession()
  const router = useRouter()
  const { openGame, handleOpenGame } = useOpenGameContext()
  const { playerCreate } = usePlayerCreateContext()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState('')
  const {
    cs2Publications,
    fortnitePublications,
    rocketLeaguePublications,
    dota2Publications,
    lolPublications,
    valorantPublications,
    checkPublication
  } = useCheckPublications({ setError })

  const handleSubmit = async () => {
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

    const check = await checkPublication()
    if (!check) return

    setLoading('creating')
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
        rocketLeaguePublications,
        dota2Publications
      })
    })

    const data = await response.json()
    if (data === 'User created') {
      const listOfRemove = [
        'geometry',
        'age',
        'name',
        'description',
        'gender',
        'twitter',
        'discord',
        'email',
        'cs2Publications',
        'fortnitePublications',
        'valorantPublications',
        'lolPublications',
        'rocketLeaguePublications',
        'dota2Publications',
        'image',
        'imageName',
        'step'
      ]
      listOfRemove.forEach(item => localStorage.removeItem(item))
      setTimeout(() => {
        setLoading('created')
      }, 2000)
      setLoading('')
      router.push('/dashboard')
    } else {
      if (data === 'gender') {
        setError('El campo genero es obligatorio')
        setTimeout(() => {
          setError('')
          setSteps('step-3')
        }
        , 2000)
      } else if (data === 'age') {
        setError('La fecha de nacimiento es incorrecta')
        setTimeout(() => {
          setError('')
          setSteps('step-3')
        }
        , 2000)
      } else if (data === 'name') {
        setError('El campo nombre es incorrecto')
        setTimeout(() => {
          setError('')
          setSteps('step-3')
        }
        , 2000)
      } else if (data === 'description') {
        setError('El campo descripción es incorrecto')
        setTimeout(() => {
          setError('')
          setSteps('step-3')
        }
        , 2000)
      } else if (data === 'geometry') {
        setError('La ubicación es incorrecta')
        setTimeout(() => {
          setError('')
          setSteps('step-1')
        }
        , 2000)
      }
    }
  }

  const handleCheck = async (collection: string) => {
    const check = await checkPublication()
    if (check) {
      setError('Ya tienes una publicación, por ahora es suficiente, ¡Ya puedes crear tu usuario!')
      setTimeout(() => {
        setError('')
      }
      , 2000)
    } else {
      handleOpenGame(collection)
    }
  }

  return (
    <section className='flex flex-col items-center justify-around w-full h-full gap-5 p-5 bg-white rounded-lg md:h-4/5 md:w-1/2'>
      <PopUpError error={error} />
      <PopUpMessage
        title1='Creando usuario'
        title2='Usuario creado'
        subtitle1='Estamos creando tu usuario, por favor espera un momento'
        subtitle2='Usuario creado con éxito'
        loading={loading}
      />
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
          onClick={handleSubmit}
          className='px-5 py-3 text-sm text-white transition duration-500 ease-in-out transform shadow-xl md:text-base bg-pennBlue rounded-xl hover:shadow-inner focus:outline-none hover:-translate-x hover:scale-105 disabled:bg-slate-500'
          type='submit'
        >Crear Usuario
        </button>
      </div>
      {openGame === COLLECTIONS.cs2 && <GameForm />}
      {openGame === COLLECTIONS.valorant && <GameForm />}
      {openGame === COLLECTIONS.lol && <GameForm />}
      {openGame === COLLECTIONS.fortnite && <GameForm />}
    </section>
  )
}
