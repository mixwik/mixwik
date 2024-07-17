import '@fontsource-variable/onest'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Toaster } from 'react-hot-toast'
import CookieConsent from '../components/CookiesConsent'
import DataProvider from '../context'
import '../styles/globals.scss'
const NoPrivate = ({ children }) => <>{children}</>

function MyApp ({ Component, pageProps }) {
  const Auth = Component.Auth || NoPrivate
  return (
    <DataProvider>
      <Auth>
        <Toaster
          position='center'
          reverseOrder={false}
        />
        <Component {...pageProps} />
        <Analytics />
        <SpeedInsights />
        <CookieConsent />
      </Auth>
    </DataProvider>
  )
}

export default MyApp
