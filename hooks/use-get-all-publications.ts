import { useEffect, useState } from 'react'
import { gameServer, teamServer } from '../domain/types'
export const useGetAllPublications = () => {
  const [publications, setPublications] = useState<gameServer[] | teamServer[]>([])

  useEffect(() => {
    (async () => {
      const games = await fetch('/api/get-all-publications')
      const publicationsData = await games.json()
      setPublications(publicationsData)
    })()
  }, [])
  return { publications }
}
