// Session
import { useState } from 'react'
import { useSession } from '../../../../firebase/auth/useSession'
import { Title } from '../title'
import { WindowLayout } from '../window-layout'
import { UpdateData } from './components/update-data'
import { UserData } from './components/user-data'

const Profile = ({ user, mixWikTeams }) => {
  const [edit, setEdit] = useState(false)
  const { userProvider } = useSession()

  return (
    <WindowLayout>
      <Title title='Perfil' />
      {edit
        ? <UpdateData
            user={user}
            mixWikTeams={mixWikTeams}
            setEdit={setEdit}
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
