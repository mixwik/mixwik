import Head from 'next/head'
import Nav from '../Nav'

const Layout = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Nav />
      {children}
    </>
  )
}

export default Layout
