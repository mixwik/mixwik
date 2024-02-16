import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useSession } from '../firebase/auth/useSession'
import { useGetOneUser } from '../firebase/hooks/getMethod/useGetOneUser'

export const useConfirmUserRegister = () => {
  const { userProvider } = useSession()
  const { user } = useGetOneUser(userProvider?.uid)
  const route = useRouter()

  useEffect(() => {
    if (userProvider?.uid) {
      if (!user) {
        route.push('/registro')
      }
    } else {
      route.push('/desautorizado')
    }
  }, [userProvider, user, route])
}
