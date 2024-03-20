// Components
import Cities from '../components/Cities'
import Footer from '../components/Footer'
import Video from '../components/Home-video'
import Layout from '../components/Layout'

// Images

export default function Home () {
  return (
    <Layout title='MixWik'>
      <Video />
      <Cities />
      <Footer />
    </Layout>
  )
}
