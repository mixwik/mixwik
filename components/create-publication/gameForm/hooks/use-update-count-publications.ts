import { useState } from 'react'

export const useUpdateCountPublications = ({ openGame, userProvider }) => {
  const [error, setError] = useState('')

  const handleUpdate = async () => {
    if (!userProvider || !openGame) {
      setError('Faltan datos para actualizar la publicación')
      return
    }
    const response = await fetch('/api/update-publication-count', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        category: openGame,
        uid: userProvider.uid
      })
    })
    if (response.status !== 200) {
      setError('Error durante la actualización del contador de la publicación')
    }
  }

  return { handleUpdate, error }
}
