import { useRouter } from 'next/router'
import styles from './Chat.module.scss'
import { useGetUsers } from '../../firebase/hooks/getMethod/useGetUsers'
import Layout from '../../components/Layout'
import PrivateRoute from '../../firebase/auth/PrivateRoute'
import { useState } from 'react'

export default function Chat () {
  const [message, setMessage] = useState('')
  const router = useRouter()
  const { uid } = router.query
  const users = useGetUsers('users')
  const user = users.find(find => find.uid === uid)
  if (!user) return <div>Loading...</div>
  const handleFirstChat = () => {
    console.log(message)
  }
  return (
    <Layout>
      <div className={styles.chat}>
        <section className={styles.chatBox}>
          <h1 className={styles.title}>{user.name}</h1>
          <ul>
            <li>Mensaje A</li>
            <li>Mensaje B</li>
          </ul>
          <form>
            <input onChange={(e) => setMessage(e.target.value)} type='text' />
            <button onClick={handleFirstChat}>Enviar</button>
          </form>
        </section>
      </div>
    </Layout>
  )
}

Chat.Auth = PrivateRoute
