import { useState } from 'react'
import { BackgroundDots } from '../../../../../components/background-dots'
import { SelectGame } from '../../../../../components/create-publication/select-game'
import { useOpenGameContext } from '../../../../../context'
import { COLLECTIONS } from '../../../../../domain/constants'
import { Title } from '../../title'

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
        <Title title={title} />
        <div className='flex items-center justify-center h-full'>
          {teams === 'maxPublications' && <p className='px-10 text-center text-red-400'>Has llegado al límite de publicaciones en este juego</p>}
          {teams === 'noMixWikTeams' && <p className='px-10 font-bold text-center text-pennBlue'>Hazte de mixWikTeams para poder hacer más publicaciones en cada juego</p>}
          <SelectGame handleCheck={handleCheck} />
        </div>
      </div>
    </section>
  )
}
