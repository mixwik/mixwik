import { Popup, Marker } from 'react-leaflet'
import L from 'leaflet'

const circuloIcon = L.icon({
  iconUrl: require('../../public/circulo.png'),
  iconSize: [50, 50]
})

const Markers = ({ position, popup }) => {
  return (

    <Marker position={position} icon={circuloIcon}>
      <Popup>
        {popup}
      </Popup>
    </Marker>

  )
}

export default Markers
