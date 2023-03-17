import { getAuth, updateProfile } from 'firebase/auth'
import { useState } from 'react'

export const useUpdateDataUser = () => {
  const [error, setError] = useState(false)
  const auth = getAuth()

  const updateDataUser = (displayName, photoURL) => {
    updateProfile(auth.currentUser, {
      displayName,
      photoURL
    }).then(() => {
      // Profile updated!
      // ...
    }).catch((error) => {
      setError(error)
    })
  }
  return [error, updateDataUser]
}
