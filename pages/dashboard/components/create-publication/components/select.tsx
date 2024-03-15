import Link from 'next/link'
import { useState } from 'react'
import { BackgroundDots } from '../../../../../components/background-dots'
import { SelectGame } from '../../../../../components/create-publication/select-game'
import { useOpenGameContext } from '../../../../../context'
import { COLLECTIONS } from '../../../../../domain/constants'

export const Select = ({ mixWikTeams, user, title }) => {
  const { handleOpenGame } = useOpenGameContext()
  const [teams, setTeams] = useState('')
  const handleCheck = (name) => {
    console.log('name', name)
    if (name === COLLECTIONS.cs2) {
      if (!mixWikTeams) {
        if (!user.publications.cs2Publications) {
          handleOpenGame(name)
          setTeams('')
        } else if (user.publications.cs2Publications < 1) {
          handleOpenGame(name)
          setTeams('')
        } else {
          setTeams('noMixWikTeams')
        }
      } else if (mixWikTeams) {
        if (user.publications.cs2Publications < 5) {
          handleOpenGame(name)
        } else {
          setTeams('maxPublications')
        }
      }
    }
    if (name === COLLECTIONS.lol) {
      if (!mixWikTeams) {
        if (!user.publications.lolPublications) {
          handleOpenGame(name)
          setTeams('')
        } else if (user.publications.lolPublications < 1) {
          handleOpenGame(name)
          setTeams('')
        } else {
          setTeams('noMixWikTeams')
        }
      } else if (mixWikTeams) {
        if (user.publications.lolPublications < 5) {
          handleOpenGame(name)
        } else {
          setTeams('maxPublications')
        }
      }
    }
    if (name === COLLECTIONS.fortnite) {
      if (!mixWikTeams) {
        if (!user.publications.fortnitePublications) {
          handleOpenGame(name)
          setTeams('')
        } else if (user.publications.fortnitePublications < 1) {
          handleOpenGame(name)
          setTeams('')
        } else {
          setTeams('noMixWikTeams')
        }
      } else if (mixWikTeams) {
        if (user.publications.fortnitePublications < 5) {
          handleOpenGame(name)
        } else {
          setTeams('maxPublications')
        }
      }
    }
    if (name === COLLECTIONS.valorant) {
      if (!mixWikTeams) {
        if (!user.publications.valorantPublications) {
          handleOpenGame(name)
          setTeams('')
        } else if (user.publications.valorantPublications < 1) {
          handleOpenGame(name)
          setTeams('')
        } else {
          setTeams('noMixWikTeams')
        }
      } else if (mixWikTeams) {
        if (user.publications.valorantPublications < 5) {
          handleOpenGame(name)
        } else {
          setTeams('maxPublications')
        }
      }
    }
  }
  return (
    <section className='absolute md:top-[10vh] z-20 w-full h-[90vh] flex justify-center items-center md:py-5'>
      <BackgroundDots />
      <div className='flex flex-col items-center w-full h-full mx-auto bg-white rounded-md md:w-1/2'>
        <div className='flex items-center justify-between w-full p-1 bg-pennBlue'>
          <h1 className='pl-5 font-semibold text-white'>{title}</h1>
          <Link className='p-1 font-bold text-white rounded-sm bg-aero' href='/dashboard'>
            <svg className='w-6 h-6' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12' />
            </svg>
          </Link>
        </div>
        <div className='flex items-center justify-center h-full'>
          {teams === 'maxPublications' && <p className='px-10 text-center text-red-400'>Has llegado al límite de publicaciones en este juego</p>}
          {teams === 'noMixWikTeams' && <p className='px-10 font-bold text-center text-pennBlue'>Hazte de mixWikTeams para poder hacer más publicaciones en cada juego</p>}
          <SelectGame handleCheck={handleCheck} />
        </div>
      </div>
    </section>
  )
}
