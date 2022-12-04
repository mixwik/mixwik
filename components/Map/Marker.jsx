import { Popup, Marker } from 'react-leaflet'
import { IconLocation } from './icon'

const Markers = ({ position, popup }) => {
  return (
    <Marker position={position} icon={IconLocation}>
      <Popup>
        {popup}
      </Popup>
    </Marker>
  )
}

export default Markers
