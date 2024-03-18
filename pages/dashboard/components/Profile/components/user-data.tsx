import React from 'react'
import { SocialLinks } from '../../../../../components/social-links'
import { UserProvider, UserServer } from '../../../../../domain/types'
import { EditIcon } from '../../../../../icons/edit'
import { ProfileImage } from '../../profile-image'

interface User {
  user: UserServer
  userProvider: UserProvider
  mixWikTeams: boolean
  setEdit: React.Dispatch<React.SetStateAction<boolean>>
}

export const UserData = ({ user, userProvider, mixWikTeams, setEdit }: User) => {
  return (
    <section className='flex flex-col items-center'>
      <div className='relative flex justify-center w-full h-64'>
        <div className='w-full h-40 overflow-hidden'>
          <ProfileImage userServer={user} userProvider={userProvider} />
        </div>
        <div className='absolute bottom-0 object-cover mx-auto overflow-hidden border-2 border-solid rounded-full shadow-xl size-48 border-aero'><ProfileImage userServer={user} userProvider={userProvider} /></div>
      </div>
      <div className='flex flex-col items-center justify-center w-4/5 gap-5 pt-5'>
        <div className='flex flex-col items-center'>
          <h2 className='text-4xl font-bold text-gray-800'>{user.name}</h2>
          <p className='text-sm'>Fecha de nacimiento: {user.age}</p>
          <p className='text-sm'>{user.email}</p>
        </div>
        <p className='my-5 text-sm text-pretty'>{user.description}</p>
        <div className='flex flex-wrap justify-center gap-5'>
          <SocialLinks user={user} mixWikTeams={mixWikTeams} />
        </div>
        <button className='flex items-center gap-2 px-5 py-2 text-white rounded-md bg-pennBlue' onClick={() => setEdit((prev) => !prev)}>
          Editar
          <EditIcon className='size-5' />
        </button>
      </div>
    </section>
  )
}
