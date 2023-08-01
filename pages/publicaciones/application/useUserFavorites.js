import { useEffect, useState } from 'react'
import { setAddFavorites } from '../infrastructure/setAddFavorites'
import { setRemoveFavorites } from '../infrastructure/setRemoveFavorites'

export const useUserFavorites = ({ idPublication, visitorUser }) => {
  const [errorFavorite, setErrorFavorite] = useState(false)
  const [like, setLike] = useState(false)

  useEffect(() => {
    if (visitorUser.likes?.includes(idPublication)) {
      setLike(true)
    } else {
      setLike(false)
    }
  }, [idPublication, visitorUser])

  const handleFavorites = (id, data) => {
    if (like) {
      setRemoveFavorites(id, data).then(() => {
        setLike(false)
      }).catch(() => {
        setErrorFavorite(true)
      })
    } else {
      setAddFavorites(id, data).then(() => {
        setLike(true)
      }).catch(() => {
        setErrorFavorite(true)
      })
    }
  }

  return { handleFavorites, errorFavorite, like }
}
