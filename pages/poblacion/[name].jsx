import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import CityMap from '../../components/CityMap'

const City = () => {
  const [city, setCity] = useState()
  const router = useRouter()
  const { name } = router.query
  const url = `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(name)}&format=json&limit=1`

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(url)
        const data = await response.json()

        if (data && data.length > 0) {
          const latitud = parseFloat(data[0].lat)
          const longitud = parseFloat(data[0].lon)
          setCity([latitud, longitud])
        } else {
          throw new Error('Ciudad no encontrada')
        }
      } catch (error) {
        console.error(`Error al obtener coordenadas: ${error.message}`)
        return null
      }
    })()
  }, [url])

  if (!city) return <div>Loading...</div>

  return (
    <section>
      <h1>{name}</h1>
      {city}
      <CityMap city={city} />
    </section>
  )
}

export default City
