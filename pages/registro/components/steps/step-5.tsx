import { useRouter } from 'next/router'
import React from 'react'
import toast from 'react-hot-toast'
import { ArrowBack } from '../../../../components/Svg'
import { GameForm } from '../../../../components/create-publication/game-form'
import { SelectGame } from '../../../../components/create-publication/select-game'
import { useSession } from '../../../../firebase/auth/useSession'
import { listOfRemove } from '../../domain/consts'

export const Step5 = (
  { setSteps }:
  { setSteps: React.Dispatch<React.SetStateAction<string>>}
) => {
  const { userProvider } = useSession()
  const router = useRouter()

  const handleSubmit = async () => {
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
    const imageUrl = localStorage.getItem('image')
    const imageName = localStorage.getItem('imageName')

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
        imageUrl,
        imageName
      })
    })

    const data = await response.json()
    if (data === 'User created') {
      listOfRemove.forEach(item => localStorage.removeItem(item))
      toast.success('Usuario creado, su usuario ha sido creado con éxito')
      setTimeout(() => {
        router.push('/dashboard')
      }, 1000)
    } else {
      if (data === 'gender') {
        toast.error('El campo genero es obligatorio')
        setTimeout(() => {
          setSteps('step-3')
        }
        , 2000)
      } else if (data === 'age') {
        toast.error('La fecha de nacimiento es incorrecta')
        setTimeout(() => {
          setSteps('step-3')
        }
        , 2000)
      } else if (data === 'name') {
        toast.error('El campo nombre es incorrecto')
        setTimeout(() => {
          setSteps('step-3')
        }
        , 2000)
      } else if (data === 'description') {
        toast.error('El campo descripción es incorrecto')
        setTimeout(() => {
          setSteps('step-3')
        }
        , 2000)
      } else if (data === 'geometry') {
        toast.error('La ubicación es incorrecta')
        setTimeout(() => {
          setSteps('step-1')
        }
        , 2000)
      }
    }
  }

  return (
    <section className='flex flex-col items-center justify-around w-full h-full gap-5 p-5 bg-white rounded-lg md:h-4/5 md:w-1/2'>
      <h2 className='text-2xl font-bold text-pennBlue md:text-3xl'>Elige un juego</h2>
      <SelectGame />
      <div className='flex flex-col justify-between w-full gap-5 md:flex-row'>
        <div className='flex justify-start w-full gap-10'>
          <button
            type='button'
            className='flex items-center gap-1 text-sm md:text-base'
            onClick={() => setSteps('step-4')}
          >
            <ArrowBack className='w-6 h-6 text-white' />
            Volver
          </button>
        </div>
      </div>
      <GameForm createUser={handleSubmit} />
    </section>
  )
}
