import { useState } from 'react'
import { Cs2Filter } from '../../../components/Filters/cs2-filter'
import Layout from '../../../components/Layout'
import PageContent from '../components/PageContent'
import TitlePage from '../components/TitlePage'
import { COLLECTIONS } from '../../../domain/constants'

const Csgo = () => {
  const [distance, setDistance] = useState(700)
  return (
    <Layout>
      <PageContent
        category={COLLECTIONS.cs2}
        distance={distance}
      >
        <Cs2Filter distance={distance} setDistance={setDistance} />
        <TitlePage title='Counter Strike 2' alt='Logo de Counter Strike 2' image='/titles-logos/cs2.webp' />
      </PageContent>
    </Layout>
  )
}

export default Csgo
