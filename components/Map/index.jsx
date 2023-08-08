import dynamic from 'next/dynamic'
import MapLoader from '../Loaders/MapLoader'

const Map = dynamic(() => import('./Map'), {
  ssr: false,
  loading: () => (
    <div style={{ textAlign: 'center', paddingTop: 20 }}>
      <MapLoader />
    </div>
  )
})

export default Map
