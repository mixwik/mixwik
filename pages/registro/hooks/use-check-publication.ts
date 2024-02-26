import React, { useState } from 'react'
import { usePlayerCreateContext } from '../../../context'
import { useSession } from '../../../firebase/auth/useSession'

export const useCheckPublications = (
  { setError }:
  {setError: React.Dispatch<React.SetStateAction<string>>}
) => {
  const { userProvider } = useSession()
  const { setPlayerCreate } = usePlayerCreateContext()
  const [cs2Publications] = useState(
    Number(localStorage.getItem('cs2Publications')) ?? 0
  )
  const [fortnitePublications] = useState(
    Number(localStorage.getItem('fortnitePublications')) ?? 0
  )
  const [valorantPublications] = useState(
    Number(localStorage.getItem('valorantPublications')) ?? 0
  )
  const [lolPublications] = useState(
    Number(localStorage.getItem('lolPublications')) ?? 0
  )
  const [rocketLeaguePublications] = useState(
    Number(localStorage.getItem('rocketLeaguePublications')) ?? 0
  )
  const [dota2Publications] = useState(
    Number(localStorage.getItem('dota2Publications')) ?? 0
  )

  const checkPublication = async () => {
    const checkResponse = await fetch('/api/check-publication', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        uid: userProvider.uid,
        cs2Publications,
        fortnitePublications,
        valorantPublications,
        lolPublications,
        rocketLeaguePublications,
        dota2Publications
      })
    })
    const checkData = await checkResponse.json()
    if (!checkData.check) {
      setError('No has creado un jugador')
      localStorage.removeItem('cs2Publications')
      localStorage.removeItem('fortnitePublications')
      localStorage.removeItem('valorantPublications')
      localStorage.removeItem('lolPublications')
      localStorage.removeItem('rocketLeaguePublications')
      localStorage.removeItem('dota2Publications')
      setPlayerCreate(false)
      setTimeout(() => setError(''), 2000)
      return false
    } else {
      if (checkData.cs2Publications) {
        localStorage.setItem('cs2Publications', JSON.stringify(checkData.cs2Publications))
      } else if (checkData.fortnitePublications) {
        localStorage.setItem('fortnitePublications', JSON.stringify(checkData.fortnitePublications))
      } else if (checkData.valorantPublications) {
        localStorage.setItem('valorantPublications', JSON.stringify(checkData.valorantPublications))
      } else if (checkData.lolPublications) {
        localStorage.setItem('lolPublications', JSON.stringify(checkData.lolPublications))
      } else if (checkData.rocketLeaguePublications) {
        localStorage.setItem('RocketLeaguePublications', JSON.stringify(checkData.rocketLeaguePublications))
      } else if (checkData.dota2Publications) {
        localStorage.setItem('dota2Publications', JSON.stringify(checkData.dota2Publications))
      }
      setPlayerCreate(true)
      return true
    }
  }

  return { cs2Publications, valorantPublications, lolPublications, fortnitePublications, rocketLeaguePublications, dota2Publications, checkPublication }
}
