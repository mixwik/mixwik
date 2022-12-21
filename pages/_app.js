import DataProvider from '../context'
import '../styles/globals.css'

function MyApp ({ Component, pageProps }) {
  return (
    <DataProvider>
      <Component {...pageProps} />
    </DataProvider>
  )
}

export default MyApp
