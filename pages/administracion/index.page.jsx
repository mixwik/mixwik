import { useSession } from '../../firebase/auth/useSession'
import NoAllowed from './components/NoAllowed'

export default function Administration () {
  const myUser = useSession()

  const master1 = process.env.NEXT_PUBLIC_MASTER1
  const master2 = process.env.NEXT_PUBLIC_MASTER2

  if (master1 !== myUser.uid && master2 !== myUser.uid) return <NoAllowed />

  return (
    <div>
      <h1>Administration</h1>
    </div>
  )
}
