import { useState } from 'react'

export const useDeleteLike = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const deleteLike = async (uid: string, likes: string) => {
    setLoading(true)
    try {
      const response = await fetch('/api/delete-like', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ uid, likes })
      })
      const data = await response.json()
      if (data.error) {
        setError(data.error)
      } else {
        setSuccess(true)
      }
    } catch (error) {
      setError('Ha ocurrido un error durante la petición')
    }
    setLoading(false)
  }

  return { loading, error, success, deleteLike }
}
