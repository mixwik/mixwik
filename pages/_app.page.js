import '@fontsource-variable/onest'
import { Analytics } from '@vercel/analytics/react'
import CookieConsent from '../components/CookiesConsent'
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
        <CookieConsent />
      </Auth>
    </DataProvider>
  )
}

export default MyApp
