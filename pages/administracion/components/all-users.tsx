import { useState } from 'react'
import { useGetAllUsers } from '../../../hooks/use-get-all-users'
import { ListAllUsers } from './list-all-users'

export const AllUsers = () => {
  const [isOpened, setIsOpened] = useState(false)
  const { users } = useGetAllUsers()
  return (
    <>
      {isOpened && <ListAllUsers setIsOpened={setIsOpened} users={users} />}
      <section className='flex items-center justify-between gap-5 p-5 pb-0 bg-white'>
        <button onClick={() => setIsOpened(prev => !prev)} className='w-full p-3 text-center text-white border border-gray-100 rounded-sm shadow-md solid bg-aero'>
          <h2>Usuarios Registrados</h2>
          <span className='text-xl font-bold'>
            {users.length}
          </span>
        </button>
        <div className='w-full p-3 text-center border border-gray-200 rounded-sm shadow-md solid'>
          <h2>Usuarios con MixWikTeams</h2>
          TODO
        </div>
      </section>
    </>
  )
}
