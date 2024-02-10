import { useState } from 'react'
import FilterCsgo from '../../../components/Filters/Csgo'
import Layout from '../../../components/Layout'
import PageContent from '../components/PageContent'
import TitlePage from '../components/TitlePage'

const Csgo = () => {
  const [distance, setDistance] = useState(700)
  return (
    <Layout>
      <PageContent
        category='cs2'
        distance={distance}
      >
        <FilterCsgo distance={distance} setDistance={setDistance} />
        <TitlePage title='Counter Strike 2' alt='Logo de Counter Strike 2' image='/titles-logos/cs2.webp' />
      </PageContent>
    </Layout>
  )
}

export default Csgo
