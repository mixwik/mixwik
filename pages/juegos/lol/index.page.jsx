import { useState } from 'react'
import { TITLES_LOGOS } from '../../../assets/images'
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
        <TitlePage title='League of Legend' alt='Logo de League of Legend' image={TITLES_LOGOS.titleLol} />
      </PageContent>
    </Layout>
  )
}

export default Lol
