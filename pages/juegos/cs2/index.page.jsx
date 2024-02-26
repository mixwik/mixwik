import { useState } from 'react'
import { FilterCs2 } from '../../../components/Filters/cs2'
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
        <FilterCs2 distance={distance} setDistance={setDistance} />
        <TitlePage title='Counter Strike 2' alt='Logo de Counter Strike 2' image='/titles-logos/cs2.webp' />
      </PageContent>
    </Layout>
  )
}

export default Csgo
