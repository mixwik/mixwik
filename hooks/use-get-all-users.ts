import { useEffect, useState } from 'react'
import { UserServer } from '../domain/types'
export const useGetAllUsers = () => {
  const [users, setUsers] = useState<UserServer[]>([])

  useEffect(() => {
    (async () => {
      const users = await fetch('/api/get-all-users')
      const usersData = await users.json()
      setUsers(usersData)
    })()
  }, [])
  return { users }
}
