import React, { useEffect, useState } from 'react'
import { usePlayerCreateContext } from '../../../context'
import { COLLECTIONS, GAME_PUBLICATIONS } from '../../../domain/constants'
import { useSession } from '../../../firebase/auth/useSession'

export const useCheckPublications = (
  { setError }:
  {setError: React.Dispatch<React.SetStateAction<string>>}
) => {
  const { userProvider } = useSession()
  const { setPlayerCreate } = usePlayerCreateContext()
  const [cs2Publications, setCs2Publications] = useState(0)
  const [fortnitePublications, setFortnitePublications] = useState(0)
  const [valorantPublications, setValorantPublications] = useState(0)
  const [lolPublications, setLolPublications] = useState(0)
  const [rocketLeaguePublications, setRocketLeaguePublications] = useState(0)
  const [dota2Publications, setDota2Publications] = useState(0)

  useEffect(() => {
    setCs2Publications(Number(localStorage.getItem(GAME_PUBLICATIONS.cs2)) ?? 0)
    setFortnitePublications(Number(localStorage.getItem(GAME_PUBLICATIONS.fortnite)) ?? 0)
    setValorantPublications(Number(localStorage.getItem(GAME_PUBLICATIONS.valorant)) ?? 0)
    setLolPublications(Number(localStorage.getItem(GAME_PUBLICATIONS.lol)) ?? 0)
    setRocketLeaguePublications(Number(localStorage.getItem(GAME_PUBLICATIONS.rocketLeague)) ?? 0)
    setDota2Publications(Number(localStorage.getItem(GAME_PUBLICATIONS.dota2)) ?? 0)
  }, [])

  const checkPublication = async () => {
    const checkResponse = await fetch('/api/check-publication', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        uid: userProvider.uid
      })
    })
    const checkData = await checkResponse.json()
    if (!checkData.check) {
      localStorage.removeItem(GAME_PUBLICATIONS.cs2)
      localStorage.removeItem(GAME_PUBLICATIONS.fortnite)
      localStorage.removeItem(GAME_PUBLICATIONS.valorant)
      localStorage.removeItem(GAME_PUBLICATIONS.lol)
      localStorage.removeItem(GAME_PUBLICATIONS.rocketLeague)
      localStorage.removeItem(GAME_PUBLICATIONS.dota2)
      setPlayerCreate(false)
      return false
    } else {
      if (checkData.publication === COLLECTIONS.cs2) {
        localStorage.setItem(GAME_PUBLICATIONS.cs2, '1')
        setCs2Publications(1)
      } else if (checkData.publication === COLLECTIONS.fortnite) {
        localStorage.setItem(GAME_PUBLICATIONS.fortnite, '1')
        setFortnitePublications(1)
      } else if (checkData.publication === COLLECTIONS.valorant) {
        localStorage.setItem(GAME_PUBLICATIONS.valorant, '1')
        setValorantPublications(1)
      } else if (checkData.publication === COLLECTIONS.lol) {
        localStorage.setItem(GAME_PUBLICATIONS.lol, '1')
        setLolPublications(1)
      } else if (checkData.publication === COLLECTIONS.rocketLeague) {
        localStorage.setItem(GAME_PUBLICATIONS.rocketLeague, '1')
        setRocketLeaguePublications(1)
      } else if (checkData.publication === COLLECTIONS.dota2) {
        localStorage.setItem(GAME_PUBLICATIONS.dota2, '1')
        setDota2Publications(1)
      }
      setPlayerCreate(true)
      return true
    }
  }

  return { cs2Publications, valorantPublications, lolPublications, fortnitePublications, rocketLeaguePublications, dota2Publications, checkPublication }
}
