import { useFilterContext } from '../../context'

export const useUserCsgoFilters = (listUsers) => {
  const filter = useFilterContext()

  const listUsersAge = listUsers.filter(fil => fil.age >= filter.age.min && fil.age <= filter.age.max)

  const listUsersPosition = filter.position.length
    ? listUsersAge.filter(fil => {
      return filter.position.some((fil2) => {
        return fil.csgo.position.includes(fil2)
      })
    })
    : listUsersAge

  const listUsersTypeOfGamer = filter.typeOfGamer.length
    ? listUsersPosition.filter(fil => fil.csgo.typeOfGamer === filter.typeOfGamer)
    : listUsersPosition

  return listUsersTypeOfGamer
}
