// Components
import Cities from '../components/Cities'
import Footer from '../components/Footer'
import { Hero } from '../components/hero.tsx'
import Layout from '../components/Layout'

// Images

export default function Home () {
  return (
    <Layout title='MixWik'>
      <Hero />
      <Cities />
      <Footer />
    </Layout>
  )
}
