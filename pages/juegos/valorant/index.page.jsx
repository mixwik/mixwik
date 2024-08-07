import { ValorantFilter } from '../../../components/Filters/valorant-filter'
import Layout from '../../../components/Layout'
import { useDistance } from '../../../hooks/use-distance'
import PageContent from '../components/PageContent'
import TitlePage from '../components/TitlePage'

const Valorant = () => {
  const { distance, setDistance } = useDistance()
  return (
    <Layout>
      <PageContent
        category='valorant'
        distance={distance}
      >
        <ValorantFilter distance={distance} setDistance={setDistance} />
        <TitlePage title='Valorant' alt='Logo de Valorant' image='/titles-logos/valorant.webp' />
      </PageContent>
    </Layout>
  )
}

export default Valorant
