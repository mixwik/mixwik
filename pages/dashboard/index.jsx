// React hooks
import { useState, useEffect } from 'react'

// styles
import styles from './Dashboard.module.scss'

// db
import { useSession } from '../../firebase/auth/useSession'
import { useGetUsers } from '../../firebase/hooks/getMethod/useGetUsers'
import PrivateRoute from '../../firebase/auth/PrivateRoute'

// Componentes
import Layout from '../../components/Layout'
import NewUser from '../../components/NewUser'
import Profile from '../../components/Dashboard/Profile'
import NewPublication from '../../components/Dashboard/NewPublication'
import Link from 'next/link'
import Image from 'next/image'
import { myLoader } from '../../components/myLoader'
import ChatHome from '../../Chat/Home'

// Images
import { Company, ContactUs, AddPublication, Publications, ChatIcon } from '../../components/Svg'

export default function Dashboard () {
  const [isOpen, setIsOpen] = useState(false)
  const [toggle, setToggle] = useState(false)
  useEffect(() => {
    setToggle('loading')
    setTimeout(() => {
      setToggle('profile')
    }, 500)
  }, [])

  const handleToggle = (name) => {
    setToggle(name)
    setIsOpen(false)
  }

  const user = useSession()
  const users = useGetUsers('users')

  const currentUser = users.find(find => find.uid === user.uid)
  if (toggle === 'loading') return <div>Loading...</div>
  if (!currentUser) return <NewUser />

  return (
    <Layout>
      <section data-open={isOpen} className={styles.dashboard}>
        {toggle === 'profile' && <Profile user={currentUser} />}
        {toggle === 'newPublication' && <NewPublication user={currentUser} />}
        {toggle === 'chat' && <ChatHome user={currentUser} />}
        <nav data-open={isOpen} className={styles.nav}>
          <ul>
            <li
              data-isActive={toggle === 'profile'}
              onClick={() => handleToggle('profile')}
            >
              <Image
                width={0}
                height={0}
                loader={myLoader}
                src={currentUser.profileImg}
                alt={currentUser.name}
              />
              Perfil
            </li>
            <li
              data-isActive={toggle === 'newPublication'}
              onClick={() => handleToggle('newPublication')}
            >
              <AddPublication />
              Añadir publicación
            </li>
            <li>
              <Publications />
              Mis publicaciones
            </li>
            <li
              data-isActive={toggle === 'chat'}
              onClick={() => handleToggle('chat')}
            >
              <ChatIcon />
              Chats
            </li>
            <li className={styles.ours}>
              <Link href='/sobre-nosotros'>
                <Company />
                Sobre Nosotros
              </Link>
            </li>
            <li className={styles.contact}>
              <Link href='/contacto'>
                <ContactUs />
                Contáctanos
              </Link>
            </li>
          </ul>
        </nav>
        <button
          className={styles.burguerButton} onClick={() => setIsOpen(!isOpen)}
          data-open={isOpen}
        >
          <div className={styles.grid1} />
          <div className={styles.grid2} />
          <div className={styles.grid3} />
          <div className={styles.grid4} />
        </button>
      </section>
    </Layout>
  )
}

Dashboard.Auth = PrivateRoute
