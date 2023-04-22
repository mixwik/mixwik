import { Analytics } from '@vercel/analytics/react'
import DataProvider from '../context'
import '../styles/globals.scss'
const NoPrivate = ({ children }) => <>{children}</>

function MyApp ({ Component, pageProps }) {
  const Auth = Component.Auth || NoPrivate
  return (
    <DataProvider>
      <Auth>
        <Component {...pageProps} />
        <Analytics />
      </Auth>
    </DataProvider>
  )
}

export default MyApp
