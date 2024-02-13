import { useFilterContext } from '../../context'
import { FILTER_KEYS } from '../../domain/constants'
import { useUserFilterDistance } from '../useUsersFilterDistance'
import { useCallback } from 'react'

export const useGamesFilters = (user, DB, distance) => {
  const filter = useFilterContext()
  let users = useUserFilterDistance(user, DB, distance)

  const filterUsers = useCallback((users, filter, key) => {
    if (filter[key].length) {
      return users.filter(user => filter[key].some(filterValue => user[key].includes(filterValue)))
    }
    return users
  }, [])

  FILTER_KEYS.forEach(key => {
    users = filterUsers(users, filter, key)
  })

  users = users.filter(user => user.age >= filter.age.min && user.age <= filter.age.max)

  return users
}
