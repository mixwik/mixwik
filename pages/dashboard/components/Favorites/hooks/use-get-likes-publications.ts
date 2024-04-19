import { useEffect, useState } from 'react'
import { gameServer, teamServer } from '../../../../../domain/types'

export const useGetLikesPublications = (likesId) => {
  const [publications, setPublications] = useState<gameServer[] | teamServer[]>([])
  useEffect(() => {
    (async () => {
      const data = await fetch('/api/get-all-likes-publications', {
        method: 'POST',
        body: JSON.stringify({
          likesId
        })
      })
      const response = await data.json()
      setPublications(response)
    })()
  }, [likesId])
  return { publications }
}
