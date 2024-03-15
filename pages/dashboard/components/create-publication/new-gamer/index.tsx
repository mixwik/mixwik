import { GameForm } from '../../../../../components/create-publication/game-form'
import { Select } from '../components/select'

export const NewPublication = ({ user, mixWikTeams, page }) => {
  if (page !== 'newPublication') return null
  return (
    <>
      <GameForm dashboard />
      <Select user={user} mixWikTeams={mixWikTeams} title='Crear Jugador' />
    </>
  )
}
