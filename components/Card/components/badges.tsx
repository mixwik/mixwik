import { Badge } from './badge'

export const Badges = ({ mixWikTeams, equips, promotions }) => {
  if (mixWikTeams) {
    if (equips) {
      return (
        <Badge team className='bg-orange' />
      )
    } else if (promotions) {
      return (
        <Badge promotion className='bg-indigo-600' />
      )
    } else {
      return (
        <Badge jugador className='bg-aero' />
      )
    }
  } else {
    if (promotions) {
      return (
        <Badge promotion className='bg-indigo-600' />
      )
    } else {
      return (
        <Badge jugador className='bg-aero' />
      )
    }
  }
}
