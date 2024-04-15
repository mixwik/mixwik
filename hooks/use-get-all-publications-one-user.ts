import { useEffect, useState } from 'react'
import { gameServer, teamServer } from '../domain/types'

export const useGetAllPublicationsOneUser = (id: string) => {
  const [publications, setPublications] = useState<gameServer[] | teamServer[]>([])

  useEffect(() => {
    (async () => {
      const games = await fetch('/api/get-all-publications-of-one-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
      })
      const publicationsData = await games.json()
      setPublications(publicationsData)
    })()
  }, [id])
  return { publications }
}
