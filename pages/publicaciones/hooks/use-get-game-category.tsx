import { useEffect, useState } from 'react'
import { gameServer, teamServer } from '../../../domain/types'

export const useGetGameCategory = ({ id, collection }) => {
  const [refetch, setRefetch] = useState(false)
  const [publication, setPublication] = useState<gameServer | teamServer>()
  const [publicationError, setPublicationError] = useState('')
  useEffect(() => {
    const getGameCategory = async () => {
      const response = await fetch('/api/get-one-publication', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, collection })
      })
      const data = await response.json()
      if (data.game === 'data') {
        setPublication(data.gameServer)
      } else {
        setPublicationError(data.game)
      }
    }
    getGameCategory()
  }, [id, collection, refetch])
  return { publication, publicationError, setRefetch }
}
