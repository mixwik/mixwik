import { useFilterContext } from '../../context'
import { useUserGeneralFilters } from '../useUserGeneralFilters'
import { useUserFilterDistance } from '../useUsersFilterDistance'

export const useUserFortniteFilters = (user, DB, distance) => {
  const filter = useFilterContext()

  const listUsers = useUserFilterDistance(user, DB, distance)

  const listUsersPosition = filter.position.length
    ? listUsers.filter(fil => {
      return filter.position.some((fil2) => {
        return fil.position.includes(fil2)
      })
    })
    : listUsers

  const listUsersTypeOfGamer = filter.typeOfGamer.length
    ? listUsersPosition.filter(fil => {
      return filter.typeOfGamer.some((fil2) => {
        return fil.typeOfGamer.includes(fil2)
      })
    })
    : listUsersPosition

  const listUsersPreferenceTeam = filter.preferenceTeam.length
    ? listUsersTypeOfGamer.filter(fil => {
      return filter.preferenceTeam.some((fil2) => {
        return fil.preferenceTeam.includes(fil2)
      })
    })
    : listUsersTypeOfGamer

  const usersFiltered = useUserGeneralFilters(listUsersPreferenceTeam)

  return usersFiltered
}
