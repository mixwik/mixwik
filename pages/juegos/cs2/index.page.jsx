import { useDistance } from '../../..//hooks/use-distance.ts'
import { Cs2Filter } from '../../../components/Filters/cs2-filter'
import Layout from '../../../components/Layout'
import { COLLECTIONS } from '../../../domain/constants'
import PageContent from '../components/PageContent'
import TitlePage from '../components/TitlePage'

const Csgo = () => {
  const { distance, setDistance } = useDistance()
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
