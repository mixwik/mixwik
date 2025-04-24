import Layout from '../../../components/Layout'
import { useDistance } from '../../../hooks/use-distance'
import PageContent from '../components/PageContent'
import TitlePage from '../components/TitlePage'
import { RocketFilters } from '../../../components/Filters/rocket-filter'

const RocketLeague = () => {
  const { distance, setDistance } = useDistance()
  return (
    <Layout>
      <PageContent
        category='rocketLeague'
        distance={distance}
      >
        <RocketFilters distance={distance} setDistance={setDistance} />
        <TitlePage title='Valorant' alt='Logo de Valorant' image='/titles-logos/rocket-league.png' />
      </PageContent>
    </Layout>
  )
}

export default RocketLeague
