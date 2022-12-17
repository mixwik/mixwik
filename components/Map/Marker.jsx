import { Popup, Marker } from 'react-leaflet'

const Markers = ({ position, popup }) => {
  return (
    <Marker position={position}>
      <Popup>
        {popup}
      </Popup>
    </Marker>
  )
}

export default Markers
