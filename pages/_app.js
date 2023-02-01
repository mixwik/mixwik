import DataProvider from '../context'
import '../styles/globals.css'

const NoPrivate = ({ children }) => <>{children}</>

function MyApp ({ Component, pageProps }) {
  const Auth = Component.Auth || NoPrivate
  return (
    <DataProvider>
      <Auth>
        <Component {...pageProps} />
      </Auth>
    </DataProvider>
  )
}

export default MyApp
