import { useState, useEffect } from 'react'

export const useUserFilter = (locationUser, users, distance) => {
  const [filteredUsers, setFilteredUsers] = useState([])
  const radius = distance
  useEffect(() => {
    if (locationUser) {
      // Recorre la lista de usuarios y calcula la distancia entre cada uno de ellos y la ubicación del usuario de referencia
      const filtered = users.filter(user => {
        const distance = getDistance(locationUser.geometry, user.geometry)
        return distance <= radius
      })
      setFilteredUsers(filtered)
    }
  }, [locationUser, users, radius])

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

  return filteredUsers
}
