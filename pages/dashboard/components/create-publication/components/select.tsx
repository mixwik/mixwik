import { useState } from 'react'
import { SelectGame } from '../../../../../components/create-publication/select-game'
import { useOpenGameContext } from '../../../../../context'
import { COLLECTIONS } from '../../../../../domain/constants'
import { WindowLayout } from '../../window-layout'

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
          handleOpenGame('')
        }
      } else if (mixWikTeams) {
        if (user.publications.cs2Publications < 5) {
          handleOpenGame(name)
        } else {
          setTeams('maxPublications')
          handleOpenGame('')
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
          handleOpenGame('')
        }
      } else if (mixWikTeams) {
        if (user.publications.lolPublications < 5) {
          handleOpenGame(name)
          setTeams('')
        } else {
          setTeams('maxPublications')
          handleOpenGame('')
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
          handleOpenGame('')
        }
      } else if (mixWikTeams) {
        if (user.publications.fortnitePublications < 5) {
          handleOpenGame(name)
          setTeams('')
        } else {
          setTeams('maxPublications')
          handleOpenGame('')
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
          handleOpenGame('')
        }
      } else if (mixWikTeams) {
        if (user.publications.valorantPublications < 5) {
          handleOpenGame(name)
          setTeams('')
        } else {
          setTeams('maxPublications')
          handleOpenGame('')
        }
      }
    }
  }
  return (
    <WindowLayout title={title}>
      <div className='relative flex items-center justify-center h-full'>
        {teams === 'maxPublications' && <p className='absolute px-10 text-center text-red-400 bottom-10'>Has llegado al límite de publicaciones en este juego</p>}
        {teams === 'noMixWikTeams' && <p className='absolute px-10 font-bold text-center bottom-10 text-pennBlue'>Hazte de mixWikTeams para poder hacer más publicaciones en cada juego</p>}
        <SelectGame handleCheck={handleCheck} />
      </div>
    </WindowLayout>
  )
}
