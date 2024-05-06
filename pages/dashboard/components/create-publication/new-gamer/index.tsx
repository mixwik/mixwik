import { GameForm } from '../../../../../components/create-publication/game-form'
import { UserServer } from '../../../../../domain/types'
import { Select } from '../components/select'

interface NewPublicationProps {
  userServer: UserServer
  isMixWikTeams: boolean
  page: string
}

export const NewPublication = ({ userServer, isMixWikTeams, page }: NewPublicationProps) => {
  if (page !== 'jugador') return null
  return (
    <>
      <GameForm dashboard userServer={userServer} isMixWikTeams={isMixWikTeams} />
      <Select userServer={userServer} isMixWikTeams={isMixWikTeams} title='Crear Jugador' />
    </>
  )
}
