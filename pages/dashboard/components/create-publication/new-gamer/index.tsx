import { GameForm } from '../../../../../components/create-publication/game-form'
import { Select } from '../components/select'

export const NewPublication = ({ userServer, mixWikTeams, page }) => {
  if (page !== 'jugador') return null
  return (
    <>
      <GameForm dashboard userServer={userServer} />
      <Select userServer={userServer} mixWikTeams={mixWikTeams} title='Crear Jugador' />
    </>
  )
}
