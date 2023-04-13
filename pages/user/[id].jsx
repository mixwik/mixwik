import Image from 'next/image'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import { myLoader } from '../../components/myLoader'
import { useGetOneData } from '../../firebase/hooks/getMethod/useGetOneData'
import styles from './User.module.scss'

const User = () => {
  const router = useRouter()
  const { id } = router.query
  const user = useGetOneData('users', id)
  if (user.length === 0) return <div>Loading...</div>
  return (
    <Layout>
      <div className={styles.user}>
        <section className={styles.userData}>
          <Image width={0} height={0} loader={myLoader} src={user.profileImg} alt={user.name} />
          <h1>{user.name}</h1>
        </section>
      </div>
    </Layout>
  )
}

export default User
