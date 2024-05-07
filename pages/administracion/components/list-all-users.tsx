import Image from 'next/image'
import { useState } from 'react'

export const ListAllUsers = ({ setIsOpened, users }) => {
  const [search, setSearch] = useState('')
  const filteredUsers = users.filter(user => user.name.toLowerCase().includes(search.toLowerCase()))
  return (
    <div className='fixed md:top-[10vh] left-0 w-screen h-[90vh] bg-white flex flex-col items-center'>
      <div className='flex items-center justify-center h-12 my-5'>
        <input className='h-full px-5 py-3 border border-gray-200 border-solid rounded-sm shadow-xl' type='text' placeholder='Buscar' onChange={(e) => setSearch(e.target.value)} />
        <button className='h-full px-5 text-white bg-pennBlue' onClick={() => setIsOpened(prev => !prev)}>Cerrar</button>
      </div>
      <section>
        <ul className='flex flex-wrap items-center justify-between h-full gap-3 p-3 overflow-scroll no-scrollbar'>
          {filteredUsers.map((user) => (
            <li key={user.id} className='relative size-40'>
              <Image className='object-cover w-full h-full' src={user?.profileImg?.url} width={50} height={50} alt={user.profileImg.name} />
              <div className='absolute bottom-0 left-0 z-10 w-full text-sm text-white bg-black/80'>
                <h2>{user.name}</h2>
                <h3>{user.email}</h3>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
