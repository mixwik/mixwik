import { useState } from 'react'

import Link from 'next/link'
import { BackgroundDots } from '../../../../components/background-dots'
import { SelectGame } from '../../../../components/create-publication/select-game'
import { TeamForm } from '../../../../components/create-publication/team-form'
import { useOpenGameContext } from '../../../../context'
import { COLLECTIONS } from '../../../../domain/constants'

export const NewTeam = ({ user, mixWikTeams, page }) => {
  const { handleOpenGame } = useOpenGameContext()
  const [teams, setTeams] = useState(false)

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
    if (name === COLLECTIONS.rocketLeague) {
      if (!mixWikTeams) {
        if (!user.publications.rocketLeaguePublications) {
          handleOpenGame(name)
          setTeams('')
        } else if (user.publications.rocketLeaguePublications < 1) {
          handleOpenGame(name)
          setTeams('')
        } else {
          setTeams('noMixWikTeams')
        }
      } else if (mixWikTeams) {
        if (user.publications.rocketLeaguePublications < 5) {
          handleOpenGame(name)
        } else {
          setTeams('maxPublications')
        }
      }
    }
    if (name === COLLECTIONS.dota2) {
      if (!mixWikTeams) {
        if (!user.publications.dota2Publications) {
          handleOpenGame(name)
          setTeams('')
        } else if (user.publications.dota2Publications < 1) {
          handleOpenGame(name)
          setTeams('')
        } else {
          setTeams('noMixWikTeams')
        }
      } else if (mixWikTeams) {
        if (user.publications.dota2Publications < 5) {
          handleOpenGame(name)
        } else {
          setTeams('maxPublications')
        }
      }
    }
  }
  if (page !== 'teams') return null
  return (
    <>
      <TeamForm dashboard />
      <section className='absolute md:top-[10vh] z-20 w-full h-[90vh] flex justify-center items-center'>
        <BackgroundDots />
        <div className='flex flex-col items-center md:h-[80vh] h-full justify-between py-5 bg-white w-full md:w-1/2 mx-auto rounded-md'>
          <h1 className='text-2xl font-bold'>
            Crea un Equipo
          </h1>
          {teams === 'maxPublications' && <p className='px-10 text-center text-red-400'>Has llegado al límite de publicaciones en este juego</p>}
          {teams === 'noMixWikTeams' && <p className='px-10 font-bold text-center text-pennBlue'>Hazte de mixWikTeams para poder hacer más publicaciones en cada juego</p>}
          <SelectGame handleCheck={handleCheck} />
          <Link href='/dashboard' className='flex items-center gap-3 px-10 py-3 text-white duration-300 rounded-md bg-aero hover:bg-pennBlue'>
            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='font-bold size-6'>
              <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75' />
            </svg>
            Volver
          </Link>
        </div>
      </section>
    </>
  )
}
