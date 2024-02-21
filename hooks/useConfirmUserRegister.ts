import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useSession } from '../firebase/auth/useSession'
import { useGetOneUser } from '../firebase/hooks/getMethod/useGetOneUser'

export const useConfirmUserRegister = () => {
  const { userProvider, isSession } = useSession()
  const { isData } = useGetOneUser(userProvider?.uid)
  const route = useRouter()

  useEffect(() => {
    if (isSession !== 'no-session') {
      if (isData === 'no-data') {
        route.push('/registro')
      }
    } else {
      route.push('/desautorizado')
    }
  }, [isSession, isData, route])
}