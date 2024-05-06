// Session
import { useState } from 'react'
import { useSession } from '../../../../firebase/auth/useSession'
import { WindowLayout } from '../window-layout'
import { UpdateData } from './components/update-data'
import { UserData } from './components/user-data'

const Profile = ({ user, isMixWikTeams, page, setRefetch }) => {
  const [edit, setEdit] = useState(false)
  const { userProvider } = useSession()

  if (page !== 'profile') return null
  return (
    <WindowLayout title='Perfil'>
      {edit
        ? <UpdateData
            user={user}
            isMixWikTeams={isMixWikTeams}
            setEdit={setEdit}
            setRefetch={setRefetch}
          />
        : <UserData
            user={user}
            userProvider={userProvider}
            isMixWikTeams={isMixWikTeams}
            setEdit={setEdit}
          />}
    </WindowLayout>
  )
}

export default Profile
