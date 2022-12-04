// Leaflet
import { Icon } from 'leaflet'

export const IconLocation = new Icon({
  iconUrl: require('./venue_location_icon.svg'),
  iconRetinaUrl: require('./venue_location_icon.svg'),
  iconSize: [35, 35],
  className: 'leaflet-venue-icon'
})
