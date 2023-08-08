import { useEffect, useState } from 'react'
import { COLLECTIONS } from '../domain/constants'
import { useGetTeams } from '../firebase/hooks/getMethod/useGetTeams'

export const useAllTeams = () => {
  const [allTeams, setAllTeams] = useState([])
  const teamsCsgo = useGetTeams(COLLECTIONS.teams, COLLECTIONS.cs2)
  const teamsLol = useGetTeams(COLLECTIONS.teams, COLLECTIONS.lol)
  const teamsFortnite = useGetTeams(COLLECTIONS.teams, COLLECTIONS.fortnite)
  const teamsValorant = useGetTeams(COLLECTIONS.teams, COLLECTIONS.valorant)
  useEffect(() => {
    const allTeamsArray = [...teamsCsgo, ...teamsLol, ...teamsFortnite, ...teamsValorant]
    setAllTeams(allTeamsArray)
  }, [teamsCsgo, teamsLol, teamsFortnite, teamsValorant])

  return { allTeams }
}
