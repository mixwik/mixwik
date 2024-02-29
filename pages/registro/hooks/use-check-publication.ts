import React, { useEffect, useState } from 'react'
import { usePlayerCreateContext } from '../../../context'
import { COLLECTIONS } from '../../../domain/constants'
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
    setCs2Publications(Number(localStorage.getItem('cs2Publications')) ?? 0)
    setFortnitePublications(Number(localStorage.getItem('fortnitePublications')) ?? 0)
    setValorantPublications(Number(localStorage.getItem('valorantPublications')) ?? 0)
    setLolPublications(Number(localStorage.getItem('lolPublications')) ?? 0)
    setRocketLeaguePublications(Number(localStorage.getItem('rocketLeaguePublications')) ?? 0)
    setDota2Publications(Number(localStorage.getItem('dota2Publications')) ?? 0)
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
      localStorage.removeItem('cs2Publications')
      localStorage.removeItem('fortnitePublications')
      localStorage.removeItem('valorantPublications')
      localStorage.removeItem('lolPublications')
      localStorage.removeItem('rocketLeaguePublications')
      localStorage.removeItem('dota2Publications')
      setPlayerCreate(false)
      return false
    } else {
      if (checkData.publication === COLLECTIONS.cs2) {
        localStorage.setItem('cs2Publications', '1')
        setCs2Publications(1)
      } else if (checkData.publication === COLLECTIONS.fortnite) {
        localStorage.setItem('fortnitePublications', '1')
        setFortnitePublications(1)
      } else if (checkData.publication === COLLECTIONS.valorant) {
        localStorage.setItem('valorantPublications', '1')
        setValorantPublications(1)
      } else if (checkData.publication === COLLECTIONS.lol) {
        localStorage.setItem('lolPublications', '1')
        setLolPublications(1)
      } else if (checkData.publication === COLLECTIONS.rocketLeague) {
        localStorage.setItem('RocketLeaguePublications', '1')
        setRocketLeaguePublications(1)
      } else if (checkData.publication === COLLECTIONS.dota2) {
        localStorage.setItem('dota2Publications', '1')
        setDota2Publications(1)
      }
      setPlayerCreate(true)
      return true
    }
  }

  return { cs2Publications, valorantPublications, lolPublications, fortnitePublications, rocketLeaguePublications, dota2Publications, checkPublication }
}
