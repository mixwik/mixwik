import Link from 'next/link'
import { useState } from 'react'
import { useGetData } from '../../../firebase/hooks/getMethod/useGetData'
import styles from './Users.module.scss'

const Users = () => {
  const [search, setSearch] = useState('')
  const users = useGetData('users')

  const filterUsersSearch = search !== ''
    ? users.filter(user => user.name.toLowerCase().includes(search.toLowerCase()) || user.email.toLowerCase().includes(search.toLowerCase()))
    : users

  const handleBan = () => {
    if (window.confirm('¿Estás seguro de banear a este usuario?')) {
      alert('Usuario baneado')
    }
  }

  return (
    <section className={styles.users}>
      <h1 className={styles.title}>Número total de usuarios de MixWik: {users.length}</h1>
      <input type='text' placeholder='Buscar usuario' onChange={e => setSearch(e.target.value)} />
      <ul className={styles.listUsers}>
        {
        filterUsersSearch.map(user => (
          <li key={user.id}>
            <p>{user.name}</p>
            <p>{user.email}</p>
            <Link target='_blank' href={`/user/${user.uid}`} rel='noreferrer'>Ver perfil</Link>
            <button onClick={handleBan}>Banear</button>
          </li>
        ))
       }
      </ul>
    </section>
  )
}

export default Users
