import { useState, useEffect } from 'react'

export const useCurrentPosition = () => {
  const [currentPosition, setCurrentPosition] = useState([])

  useEffect(() => {
    if ('geolocation' in navigator) {
      const onUbicacionConcedida = ubicacion => {
        const position = []
        position.push(ubicacion.coords.latitude, ubicacion.coords.longitude)
        setCurrentPosition(position)
      }

      const onErrorDeUbicacion = () => {
        setCurrentPosition([40.414971037098056, -3.7072115929025924])
      }

      const opcionesDeSolicitud = {
        enableHighAccuracy: true, // Alta precisión
        maximumAge: 0, // No queremos caché
        timeout: 5000 // Esperar solo 5 segundos
      }
      navigator.geolocation.getCurrentPosition(onUbicacionConcedida, onErrorDeUbicacion, opcionesDeSolicitud)
    } else {
      return alert('Tu navegador no soporta el acceso a la ubicación. Intenta con otro')
    }
  }, [])

  return currentPosition
}
