// Session
import { useState } from 'react'
import { useSession } from '../../../../firebase/auth/useSession'
import { Title } from '../title'
import { WindowLayout } from '../window-layout'
import { UpdateData } from './components/update-data'
import { UserData } from './components/user-data'

const Profile = ({ user, mixWikTeams, page, setRefetch }) => {
  const [edit, setEdit] = useState(false)
  const { userProvider } = useSession()

  if (page !== 'profile') return null
  return (
    <WindowLayout>
      <Title title='Perfil' />
      {edit
        ? <UpdateData
            user={user}
            mixWikTeams={mixWikTeams}
            setEdit={setEdit}
            setRefetch={setRefetch}
          />
        : <UserData
            user={user}
            userProvider={userProvider}
            mixWikTeams={mixWikTeams}
            setEdit={setEdit}
          />}
    </WindowLayout>
  )
}

export default Profile
