// Session
import { useState } from 'react'
import { useSession } from '../../../../firebase/auth/useSession'
import { Title } from '../title'
import { WindowLayout } from '../window-layout'
import { UserData } from './components/user-data'

const Profile = ({ user, mixWikTeams }) => {
  const [edit, setEdit] = useState(false)
  const { userProvider } = useSession()

  return (
    <WindowLayout>
      <Title title='Perfil' />
      <div className='relative'>
        <button onClick={() => setEdit(prev => !prev)} className='absolute z-10 top-3 right-3'>Editar</button>
        <UserData user={user} userProvider={userProvider} edit={edit} />
      </div>
    </WindowLayout>
  )
}

export default Profile
