import { useSession } from '../../firebase/auth/useSession'

import PrivateRoute from '../../firebase/auth/PrivateRoute'

import Layout from '../../components/Layout'

export default function Dashboard () {
  const user = useSession()

  return (
    <Layout>
      <h1>{user.name}</h1>
    </Layout>
  )
}

Dashboard.Auth = PrivateRoute
