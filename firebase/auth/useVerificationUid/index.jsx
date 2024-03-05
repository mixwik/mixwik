import { useRouter } from 'next/router'

export const useVerificationUid = () => {
  const router = useRouter()

  const verification = (myself) => {
    if (!myself) router.push('/dashboard')
  }

  return verification
}
