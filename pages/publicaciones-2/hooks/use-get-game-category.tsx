import { useEffect, useState } from 'react'

export const useGetGameCategory = ({ id, collection }) => {
  const [game, setGame] = useState()
  const [gameError, setGameError] = useState('')
  useEffect(() => {
    const getGameCategory = async () => {
      const response = await fetch('/api/get-one-publication', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, collection })
      })
      const data = await response.json()
      if (data.game === 'data') {
        setGame(data.gameServer)
      } else {
        setGameError(data.game)
      }
    }
    getGameCategory()
  }, [id, collection])
  return { game, gameError }
}
