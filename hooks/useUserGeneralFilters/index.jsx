import { useFilterContext } from '../../context'

export const useUserGeneralFilters = (listUsers) => {
  const filter = useFilterContext()

  const listUsersAge = listUsers.filter(fil => fil.age >= filter.age.min && fil.age <= filter.age.max)

  return listUsersAge
}
