import styles from './Layout.module.scss'

import Head from 'next/head'
import { LogIn } from '../LogIn'
import Nav from '../Nav'

const Layout = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Nav />
      <main className={styles.main}>
        {children}
      </main>
      <LogIn />
    </>
  )
}

export default Layout
