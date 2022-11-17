import styles from './Map.module.scss'
import { useState } from 'react'

import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'

const Map = () => {
  // const [map, setMap] = useState([1, 2])

  // useEffect(() => {
  //   if ('geolocation' in navigator) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       setMap([position.coords.latitude, position.coords.longitude])
  //     })
  //   } else {
  //     alert('No tienes geolocalización')
  //   }
  // }, [setMap])
  function LocationMarker () {
    const [position, setPosition] = useState(null)
    const map = useMapEvents({
      click () {
        map.locate()
      },
      locationfound (e) {
        setPosition(e.latlng)
        map.flyTo(e.latlng, map.getZoom())
        console.log(position)
      }
    })

    return position === null
      ? null
      : (
        <Marker position={position}>
          <Popup>You are here</Popup>
        </Marker>
        )
  }

  return (
    <div className={styles.map}>
      <MapContainer
        center={{ lat: 51.505, lng: -0.09 }}
        zoom={10}
        scrollWheelZoom
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <LocationMarker />
      </MapContainer>
    </div>
  )
}

export default Map
