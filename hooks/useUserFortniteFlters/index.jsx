import { useFilterContext } from '../../context'
import { useUserGeneralFilters } from '../useUserGeneralFilters'
import { useUserFilterDistance } from '../useUsersFilterDistance'

export const useUserFortniteFilters = (user, DB, distance) => {
  const filter = useFilterContext()

  const listUsers = useUserFilterDistance(user, DB, distance)

  const listUsersPosition = filter.position.length
    ? listUsers.filter(fil => {
      return filter.position.some((fil2) => {
        return fil.fortnite.position.includes(fil2)
      })
    })
    : listUsers

  const listUsersTypeOfGamer = filter.typeOfGamer.length
    ? listUsersPosition.filter(fil => fil.fortnite.typeOfGamer === filter.typeOfGamer)
    : listUsersPosition

  const listUsersPreferenceTeam = filter.preferenceTeam.length
    ? listUsersTypeOfGamer.filter(fil => fil.fortnite.preferenceTeam === filter.preferenceTeam)
    : listUsersTypeOfGamer

  const usersFiltered = useUserGeneralFilters(listUsersPreferenceTeam)

  return usersFiltered
}
