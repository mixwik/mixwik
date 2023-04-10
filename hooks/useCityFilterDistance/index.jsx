import { useEffect, useState } from 'react'

export const useCityFilterDistance = (city, publication, distance) => {
  const [filteredUsersDistance, setFilteredUsersDistance] = useState([])
  const radius = distance
  useEffect(() => {
    const positionUser = city
    if (positionUser) {
      const filtered = publication.filter(user => {
        const distance = getDistance(positionUser, user.geometry)
        return distance <= radius
      })
      setFilteredUsersDistance(filtered)
    }
  }, [publication, radius, city])

  // Función para calcular la distancia entre dos puntos utilizando la fórmula Haversine
  function getDistance (point1, point2) {
    const R = 6371 // Radio de la Tierra en kilómetros
    const lat1 = point1[0] * (Math.PI / 180)
    const lng1 = point1[1] * (Math.PI / 180)
    const lat2 = point2[0] * (Math.PI / 180)
    const lng2 = point2[1] * (Math.PI / 180)

    const a = Math.sin((lat2 - lat1) / 2) ** 2 +
      Math.cos(lat1) * Math.cos(lat2) *
      Math.sin((lng2 - lng1) / 2) ** 2
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const distance = R * c
    return distance
  }
  return filteredUsersDistance
}
