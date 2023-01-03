import { useFilterContext } from '../../context'
import { useUserGeneralFilters } from '../useUserGeneralFilters'
import { useUserFilterDistance } from '../useUsersFilterDistance'

export const useUserCsgoFilters = (user, DB, distance) => {
  const filter = useFilterContext()

  const listUsers = useUserFilterDistance(user, DB, distance)

  const listUsersPosition = filter.position.length
    ? listUsers.filter(fil => {
      return filter.position.some((fil2) => {
        return fil.csgo.position.includes(fil2)
      })
    })
    : listUsers

  const listUsersTypeOfGamer = filter.typeOfGamer.length
    ? listUsersPosition.filter(fil => {
      return filter.typeOfGamer.some((fil2) => {
        return fil.csgo.typeOfGamer.includes(fil2)
      })
    })
    : listUsersPosition

  const listUsersLevel = filter.level.length
    ? listUsersTypeOfGamer.filter(fil => fil.csgo.level === filter.level)
    : listUsersTypeOfGamer

  const usersFiltered = useUserGeneralFilters(listUsersLevel)

  return usersFiltered
}
