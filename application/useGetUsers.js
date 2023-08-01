import { useEffect, useState } from 'react'
import { COLLECTIONS } from '../domain/constants'
import { getData } from '../infrastructure/getData'

export const useGetUsers = () => {
  const [users, setUsers] = useState([])
  const [error, setError] = useState(false)
  useEffect(() => {
    const data = getData(COLLECTIONS.users)
    const usersArr = []
    data.then((querySnapshot) => {
      if (querySnapshot.empty) setError(true)

      querySnapshot.forEach((doc) => {
        usersArr.push({
          id: doc.id,
          name: doc.data().name,
          age: doc.data().age,
          gender: doc.data().gender,
          email: doc.data().email,
          profileImg: doc.data().profileImg,
          geometry: doc.data().geometry,
          mixWikTeams: doc.data().mixWikTeams,
          uid: doc.data().uid,
          favorites: doc.data().likes,
          social: doc.data().social,
          admonition: doc.data().admonition,
          ban: doc.data().ban,
          cs2Publications: doc.data().cs2Publications,
          fortnitePublications: doc.data().fortnitePublications,
          lolPublications: doc.data().lolPublications,
          valorantPublications: doc.data().valorantPublications
        })
      })
      setUsers(usersArr)
    }).catch(() => {
      setError(true)
    })
  }, [])
  return { users, error }
}
