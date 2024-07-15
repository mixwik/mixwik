import { useState } from 'react'
import { SelectGame } from '../../../../../components/create-publication/select-game'
import { useOpenGameContext } from '../../../../../context'
import { COLLECTIONS } from '../../../../../domain/constants'
import { WindowLayout } from '../../window-layout'
import toast from 'react-hot-toast'

export const Select = ({ isMixWikTeams, userServer, title }) => {
  const { handleOpenGame } = useOpenGameContext()
  const [teams, setTeams] = useState('')
  const handleCheck = (name) => {
    if (name === COLLECTIONS.cs2) {
      if (!isMixWikTeams) {
        if (!userServer.publications.cs2Publications) {
          handleOpenGame(name)
          setTeams('')
        } else if (userServer.publications.cs2Publications < 1) {
          handleOpenGame(name)
          setTeams('')
        } else {
          setTeams('noMixWikTeams')
          handleOpenGame('')
        }
      } else if (isMixWikTeams) {
        if (userServer.publications.cs2Publications < 5) {
          handleOpenGame(name)
        } else {
          setTeams('maxPublications')
          handleOpenGame('')
        }
      }
    }
    if (name === COLLECTIONS.lol) {
      if (!isMixWikTeams) {
        if (!userServer.publications.lolPublications) {
          handleOpenGame(name)
          setTeams('')
        } else if (userServer.publications.lolPublications < 1) {
          handleOpenGame(name)
          setTeams('')
        } else {
          setTeams('noMixWikTeams')
          handleOpenGame('')
        }
      } else if (isMixWikTeams) {
        if (userServer.publications.lolPublications < 5) {
          handleOpenGame(name)
          setTeams('')
        } else {
          setTeams('maxPublications')
          handleOpenGame('')
        }
      }
    }
    if (name === COLLECTIONS.fortnite) {
      if (!isMixWikTeams) {
        if (!userServer.publications.fortnitePublications) {
          handleOpenGame(name)
          setTeams('')
        } else if (userServer.publications.fortnitePublications < 1) {
          handleOpenGame(name)
          setTeams('')
        } else {
          setTeams('noMixWikTeams')
          handleOpenGame('')
        }
      } else if (isMixWikTeams) {
        if (userServer.publications.fortnitePublications < 5) {
          handleOpenGame(name)
          setTeams('')
        } else {
          setTeams('maxPublications')
          handleOpenGame('')
        }
      }
    }
    if (name === COLLECTIONS.valorant) {
      if (!isMixWikTeams) {
        if (!userServer.publications.valorantPublications) {
          handleOpenGame(name)
          setTeams('')
        } else if (userServer.publications.valorantPublications < 1) {
          handleOpenGame(name)
          setTeams('')
        } else {
          setTeams('noMixWikTeams')
          handleOpenGame('')
        }
      } else if (isMixWikTeams) {
        if (userServer.publications.valorantPublications < 5) {
          handleOpenGame(name)
          setTeams('')
        } else {
          setTeams('maxPublications')
          handleOpenGame('')
        }
      }
    }
  }
  if (teams === 'maxPublications') toast.error('Has llegado al límite de publicaciones en este juego')
  else if (teams === 'noMixWikTeams') toast.error('Hazte de mixWikTeams para poder hacer más publicaciones en cada juego')
  return (
    <WindowLayout title={title}>
      <div className='relative flex items-center justify-center h-full'>
        <SelectGame handleCheck={handleCheck} />
      </div>
    </WindowLayout>
  )
}
