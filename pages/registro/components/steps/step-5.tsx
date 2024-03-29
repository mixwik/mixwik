import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { ArrowBack } from '../../../../components/Svg'
import { GameForm } from '../../../../components/create-publication/game-form'
import { SelectGame } from '../../../../components/create-publication/select-game'
import { PopUpError } from '../../../../components/pop-up-error'
import { PopUpMessage } from '../../../../components/pop-up-message'
import { useOpenGameContext, usePlayerCreateContext } from '../../../../context'
import { useSession } from '../../../../firebase/auth/useSession'
import { listOfRemove } from '../../domain/consts'
import { useCheckPublications } from '../../hooks/use-check-publication'

export const Step5 = (
  { setSteps }:
  { setSteps: React.Dispatch<React.SetStateAction<string>>}
) => {
  const { userProvider } = useSession()
  const router = useRouter()
  const { handleOpenGame } = useOpenGameContext()
  const { playerCreate } = usePlayerCreateContext()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState({
    title: '',
    subtitle: '',
    number: 0

  })
  const { checkPublication } = useCheckPublications({ setError })
  const [affiliateCode, setAffiliateCode] = useState('')

  const handleSubmit = async () => {
    if (!playerCreate) return
    const geometry = JSON.parse(localStorage.getItem('geometry') ?? '[0,0]')
    const cs2Publications = Number(localStorage.getItem('cs2Publications')) ?? 0
    const fortnitePublications = Number(localStorage.getItem('fortnitePublications')) ?? 0
    const valorantPublications = Number(localStorage.getItem('valorantPublications')) ?? 0
    const lolPublications = Number(localStorage.getItem('lolPublications')) ?? 0
    const rocketLeaguePublications = Number(localStorage.getItem('rocketLeaguePublications')) ?? 0
    const dota2Publications = Number(localStorage.getItem('dota2Publications')) ?? 0
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

    setLoading({
      title: 'Creando usuario...',
      subtitle: 'Por favor espera un momento',
      number: 0
    })
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
        dota2Publications,
        affiliateCode
      })
    })

    const data = await response.json()
    if (data === 'User created') {
      listOfRemove.forEach(item => localStorage.removeItem(item))
      setLoading({
        title: 'Usuario creado',
        subtitle: 'Su usuario ha sido creado con éxito',
        number: 1
      })
      setTimeout(() => {
        setLoading({
          title: '',
          subtitle: '',
          number: 0
        })
      }, 1000)
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
      <PopUpMessage loading={loading} />
      <h2 className='text-2xl font-bold text-pennBlue md:text-3xl'>Crea un jugador</h2>
      <SelectGame handleCheck={handleCheck} />
      <label className='flex flex-col justify-center w-full gap-2 md:w-1/2'>
        <div className='relative flex items-center gap-2'>
          <input
            type='text'
            className='block w-full p-5 mt-1 bg-gray-100 border-none shadow-lg h-9 rounded-xl hover:bg-blue-100 focus:bg-blue-100 focus:ring-0'
            placeholder='Código de afiliado (opcional)'
            value={affiliateCode}
            onChange={(e) => setAffiliateCode(e.target.value)}
          />
        </div>
      </label>
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
      <GameForm />
    </section>
  )
}
