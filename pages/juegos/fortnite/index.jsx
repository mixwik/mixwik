import { useState } from 'react'
import { TITLES_LOGOS } from '../../../assets/images'
import FilterCsgo from '../../../components/Filters/Csgo'
import Layout from '../../../components/Layout'
import PageContent from '../components/PageContent'
import TitlePage from '../components/TitlePage'

const Fortnite = () => {
  const [distance, setDistance] = useState(700)
  return (
    <Layout>
      <PageContent
        category='fortnite'
        distance={distance}
      >
        <FilterCsgo distance={distance} setDistance={setDistance} />
        <TitlePage title='Fortnite' alt='Logo de Fortnite' image={TITLES_LOGOS.titleFortnite} />
      </PageContent>
    </Layout>
  )
}

export default Fortnite
