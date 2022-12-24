import { useFilterContext } from '../../context'
import { useUserGeneralFilters } from '../useUserGeneralFilters'

export const useUserCsgoFilters = (listUsers) => {
  const filter = useFilterContext()

  const listUsersPosition = filter.position.length
    ? listUsers.filter(fil => {
      return filter.position.some((fil2) => {
        return fil.csgo.position.includes(fil2)
      })
    })
    : listUsers

  const listUsersTypeOfGamer = filter.typeOfGamer.length
    ? listUsersPosition.filter(fil => fil.csgo.typeOfGamer === filter.typeOfGamer)
    : listUsersPosition

  const listUsersLevel = filter.level.length
    ? listUsersTypeOfGamer.filter(fil => fil.csgo.level === filter.level)
    : listUsersTypeOfGamer

  const usersFiltered = useUserGeneralFilters(listUsersLevel)

  return usersFiltered
}
