// styles
import styles from './NewUser.module.scss'

// Components
import Layout from '../../components/Layout'

// LogIn
import { getAuth } from 'firebase/auth'
import { useGetUids } from '../../firebase/hooks/getMethod/useGetUids'
import { useRouter } from 'next/router'

const NewUser = () => {
  const router = useRouter()
  const uids = useGetUids()
  const auth = getAuth()
  const user = auth.currentUser
  if (uids.includes(user.uid)) return router.push('/')
  return (
    <Layout>
      <section className={styles.newUser}>
        <h2>Bienvenido {user.displayName}</h2>
      </section>
    </Layout>
  )
}

export default NewUser
