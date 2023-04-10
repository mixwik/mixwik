import dynamic from 'next/dynamic'

const CityMap = dynamic(() => import('./Map'), {
  ssr: false,
  loading: () => (
    <div style={{ textAlign: 'center', paddingTop: 20 }}>
      Cargando...
    </div>
  )
})

export default CityMap
