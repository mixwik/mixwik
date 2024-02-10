import { useState } from 'react'
import FilterCsgo from '../../../components/Filters/Csgo'
import Layout from '../../../components/Layout'
import PageContent from '../components/PageContent'
import TitlePage from '../components/TitlePage'

const Lol = () => {
  const [distance, setDistance] = useState(700)
  return (
    <Layout>
      <PageContent
        category='lol'
        distance={distance}
      >
        <FilterCsgo distance={distance} setDistance={setDistance} />
        <TitlePage title='League of Legend' alt='Logo de League of Legend' image='/titles-logos/lol.webp' />
      </PageContent>
    </Layout>
  )
}

export default Lol
