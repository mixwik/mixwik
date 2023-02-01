import { useSession } from '../../firebase/auth/useSession'

import PrivateRoute from '../../firebase/auth/PrivateRoute'

export default function Dashboard () {
  const user = useSession()

  return (
    <h1>{user.name}</h1>
  )
}

Dashboard.Auth = PrivateRoute
