import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useSession } from '../firebase/auth/useSession'
import { useGetOneUser } from './use-get-one-user'

export const useConfirmUserRegister = (register?: string) => {
  const { userProvider, isSession } = useSession()
  const { isData } = useGetOneUser(userProvider?.uid)
  const route = useRouter()

  useEffect(() => {
    if (isSession !== 'no-session') {
      if (isData === 'no-data') {
        route.push('/registro')
      } else if (isData === 'data' && register === 'register') {
        route.push('/dashboard')
      }
    } else if (isSession === 'no-session' && !register) {
      route.push('/')
    }
  }, [isData, isSession, register])
}
