import { useState } from 'react'
import { TITLES_LOGOS } from '../../../assets/images'
import FilterCsgo from '../../../components/Filters/Csgo'
import Layout from '../../../components/Layout'
import PageContent from '../components/PageContent'
import TitlePage from '../components/TitlePage'

const Valorant = () => {
  const [distance, setDistance] = useState(700)
  return (
    <Layout>
      <PageContent
        category='valorant'
        distance={distance}
      >
        <FilterCsgo distance={distance} setDistance={setDistance} />
        <TitlePage title='Valorant' alt='Logo de Valorant' image={TITLES_LOGOS.titleValoran} />
      </PageContent>
    </Layout>
  )
}

export default Valorant
