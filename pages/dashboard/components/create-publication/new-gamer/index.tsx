import { GameForm } from '../../../../../components/create-publication/game-form'
import { UserServer } from '../../../../../domain/types'
import { Select } from '../components/select'

interface NewPublicationProps {
  userServer: UserServer
  mixWikTeams: boolean
  page: string
}

export const NewPublication = ({ userServer, mixWikTeams, page }: NewPublicationProps) => {
  if (page !== 'jugador') return null
  return (
    <>
      <GameForm dashboard userServer={userServer} mixWikTeams={mixWikTeams} />
      <Select userServer={userServer} mixWikTeams={mixWikTeams} title='Crear Jugador' />
    </>
  )
}
