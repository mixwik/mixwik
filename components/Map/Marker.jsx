import { Popup, Marker } from 'react-leaflet'
// import ReactDOMServer from 'react-dom/server'
// import Icon from './Icon'
import L from 'leaflet'
import styles from './Map.module.scss'

const Markers = ({ position, popup, size }) => {
  const icon = L.divIcon({
    className: styles.customIcon,
    iconSize: [size, size],
    crossOrigin: true
    // html: ReactDOMServer.renderToString(<Icon />)
  })

  return (

    <Marker position={position} icon={icon}>
      <Popup>
        {popup}
      </Popup>
    </Marker>

  )
}

export default Markers
