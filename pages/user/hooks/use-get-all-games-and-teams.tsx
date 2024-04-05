import { useEffect, useState } from 'react'
import { gameServer, teamServer } from '../../../domain/types'

export const useGetAllGamesAndTeams = (id: string) => {
  const [games, setGames] = useState<gameServer[]>([])
  const [teams, setTeams] = useState<teamServer[]>([])
  useEffect(() => {
    (async () => {
      const games = await fetch('/api/get-all-games-of-one-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
      })
      const gamesData = await games.json()
      setGames(gamesData)
    })();

    (async () => {
      const teams = await fetch('/api/get-all-teams-of-one-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
      })
      const teamsData = await teams.json()
      setTeams(teamsData)
    })()
  }, [id])
  return { games, teams }
}
