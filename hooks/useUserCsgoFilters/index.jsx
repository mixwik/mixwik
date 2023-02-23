import { useFilterContext } from '../../context'
import { useUserGeneralFilters } from '../useUserGeneralFilters'
import { useUserFilterDistance } from '../useUsersFilterDistance'

export const useUserCsgoFilters = (user, csgo, distance) => {
  const filter = useFilterContext()

  const listUsers = useUserFilterDistance(user, csgo, distance)

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

  const listUsersLevel = filter.level.length
    ? listUsersTypeOfGamer.filter(fil => {
      return filter.level.some((fil2) => {
        return fil.level.includes(fil2)
      })
    })
    : listUsersTypeOfGamer

  const usersFiltered = useUserGeneralFilters(listUsersLevel)
  return usersFiltered
}
