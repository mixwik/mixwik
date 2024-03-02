import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useSession } from '../firebase/auth/useSession'
import { useGetOneUser } from '../firebase/hooks/getMethod/useGetOneUser'

export const useConfirmUserRegister = (register?: string) => {
  const { userProvider, isSession } = useSession()
  const { isData } = useGetOneUser(userProvider?.uid)
  const route = useRouter()

  useEffect(() => {
    if (isSession !== 'no-session') {
      if (isData === 'no-data') {
        route.push('/registro')
      } else if (isData === 'data' && register === 'register') {
        route.push('/dashboard?page=profile')
      }
    } else if (isSession === 'no-session') {
      route.push('/desautorizado')
    }
  }, [isData, isSession, register])
}
