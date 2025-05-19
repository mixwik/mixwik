import { Dota2Filter } from '../../../components/Filters/dota2-filter'
import Layout from '../../../components/Layout'
import { useDistance } from '../../../hooks/use-distance'
import PageContent from '../components/PageContent'
import TitlePage from '../components/TitlePage'

const Valorant = () => {
  const { distance, setDistance } = useDistance()
  return (
    <Layout>
      <PageContent
        category='dota2'
        distance={distance}
      >
        <Dota2Filter distance={distance} setDistance={setDistance} />
        <TitlePage title='Dota2' alt='Logo de Dota2' image='/titles-logos/dota2.webp' />
      </PageContent>
    </Layout>
  )
}

export default Valorant
