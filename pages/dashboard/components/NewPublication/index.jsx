import { useState } from 'react'
import NoMorePublications from './noMorePublications'

import Link from 'next/link'
import { BackgroundDots } from '../../../../components/background-dots'
import { GameForm } from '../../../../components/gameForm'
import { SelectGame } from '../../../../components/select-game'
import { useOpenGameContext } from '../../../../context'
import { COLLECTIONS } from '../../../../domain/constants'

const NewPublication = ({ user, mixWikTeams, page }) => {
  const { handleOpenGame } = useOpenGameContext()
  const [teams, setTeams] = useState(false)

  const handleCheck = (name) => {
    console.log('name', name)
    if (name === COLLECTIONS.cs2) {
      if (!mixWikTeams) {
        if (!user.publications.cs2Publications) {
          handleOpenGame(name)
        } else if (user.publications.cs2Publications < 1) {
          handleOpenGame(name)
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
        } else if (user.publications.lolPublications < 1) {
          handleOpenGame(name)
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
        } else if (user.publications.fortnitePublications < 1) {
          handleOpenGame(name)
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
        } else if (user.publications.valorantPublications < 1) {
          handleOpenGame(name)
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
  if (page !== 'newPublication') return null
  return (
    <>
      <GameForm />
      <section className='absolute md:top-[10vh] h-[90vh] z-20'>
        <BackgroundDots />
        <div className='h-full'>
          <h1>
            <Link href='/dashboard?page=publications'>
              <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-10 h-10 font-bold'>
                <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75' />
              </svg>
            </Link>
            Selecciona categoría
          </h1>

          {teams === 'maxPublications' && <p>Has llegado al límite de publicaciones</p>}

          <SelectGame handleCheck={handleCheck} />
          <NoMorePublications setTeams={setTeams} noPremium={teams === 'noMixWikTeams'} currentUser={user} />
        </div>
      </section>
    </>
  )
}

export default NewPublication
