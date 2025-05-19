import Link from 'next/link'
import { useState } from 'react'
import { updateUserBan } from '../../../../firebase/hooks/updateMethod/updateUserData'
import { useGetAllUsers } from '../../../../hooks/use-get-all-users'
import styles from './Users.module.scss'

const AllUsers = () => {
  const [search, setSearch] = useState('')
  const { users } = useGetAllUsers()

  const filterUsersSearch = search !== ''
    ? users.filter(user => user.name.toLowerCase().includes(search.toLowerCase()) || user.email.toLowerCase().includes(search.toLowerCase()))
    : users

  const handleBan = (id) => {
    if (window.confirm('¿Estás seguro de banear a este usuario?')) {
      alert('Usuario baneado')
      updateUserBan(id, true)
    }
  }
  const handleUnBan = (id) => {
    if (window.confirm('¿Estás seguro de quitar el ban a este usuario?')) {
      alert('Usuario desbaneado')
      updateUserBan(id, false)
    }
  }

  return (
    <section className={styles.users}>
      <div className={styles.numberOfUser}>Número total de usuarios de MixWik: {users.length}</div>

      <input type='text' placeholder='Buscar usuario' onChange={e => setSearch(e.target.value)} />
      <ul className={styles.listUsers}>
        {
        filterUsersSearch.map(user => (
          <li key={user.id} data-active={user.ban}>
            <p>{user.name}</p>
            <p>{user.email}</p>
            <Link target='_blank' href={`/user/${user.uid}`} rel='noreferrer'>Ver perfil</Link>
            {
            user.ban
              ? (
                <button onClick={() => handleUnBan(user.id)}>Desbanear</button>
                )
              : (
                <button onClick={() => handleBan(user.id)}>Banear</button>
                )
            }
          </li>
        ))
       }
      </ul>
    </section>
  )
}

export default AllUsers
