import { useEffect, useState } from 'react'

export const useLocation = (name) => {
  const [city, setCity] = useState({ geometry: [] })

  const url = `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(name)}&format=json&limit=1`

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(url)
        const data = await response.json()

        if (data && data.length > 0) {
          const latitud = parseFloat(data[0].lat)
          const longitud = parseFloat(data[0].lon)
          setCity({ geometry: [latitud, longitud] })
        } else {
          throw new Error('Ciudad no encontrada')
        }
      } catch (error) {
        console.error(`Error al obtener coordenadas: ${error.message}`)
        return null
      }
    })()
  }, [url])

  return { city }
}
