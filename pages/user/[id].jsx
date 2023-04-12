import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import styles from './User.module.scss'
import { useGetOneData } from '../../firebase/hooks/getMethod/useGetOneData'

const User = () => {
  const router = useRouter()
  const { id } = router.query
  const user = useGetOneData('users', id)
  if (user.length === 0) return <div>Loading...</div>
  return (
    <Layout>
      <div className={styles.user}>
        <section className={styles.userData}>
          <h1>Usuario</h1>
          {user.name}
        </section>
      </div>
    </Layout>
  )
}

export default User
