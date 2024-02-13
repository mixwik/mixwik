import { useFilterContext } from '../../context'
import { useUserFilterDistance } from '../useUsersFilterDistance'

export const useGamesFilters = (user, DB, distance) => {
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

  const listUsersLevel = filter.level.length
    ? listUsersTypeOfGamer.filter(fil => {
      return filter.level.some((fil2) => {
        return fil.level.includes(fil2)
      })
    })
    : listUsersTypeOfGamer

  const listUsersPreferenceTeam = filter.preferenceTeam.length
    ? listUsersLevel.filter(fil => {
      return filter.preferenceTeam.some((fil2) => {
        return fil.preferenceTeam.includes(fil2)
      })
    })
    : listUsersLevel

  const listUsersAge = listUsersPreferenceTeam.filter(fil => fil.age >= filter.age.min && fil.age <= filter.age.max)

  const usersFiltered = listUsersAge

  return usersFiltered
}
