import { useEffect, useState } from 'react'
import { COLLECTIONS } from '../domain/constants'
import { useGetData } from '../firebase/hooks/getMethod/useGetData'

export const useAllGames = () => {
  const [allGames, setAllGames] = useState([])
  const csgo = useGetData(COLLECTIONS.cs2)
  const lol = useGetData(COLLECTIONS.lol)
  const fortnite = useGetData(COLLECTIONS.fortnite)
  const valorant = useGetData(COLLECTIONS.valorant)

  useEffect(() => {
    const allGamesArray = [...csgo, ...lol, ...fortnite, ...valorant]
    setAllGames(allGamesArray)
  }, [csgo, lol, fortnite, valorant])

  return { allGames }
}
