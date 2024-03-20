import { TeamForm } from '../../../../../components/create-publication/team-form'
import { Select } from '../components/select'

export const NewTeam = ({ userServer, mixWikTeams, page }) => {
  if (page !== 'teams') return null
  return (
    <>
      <TeamForm userServer={userServer} />
      <Select userServer={userServer} mixWikTeams={mixWikTeams} title='Crear Team' />
    </>
  )
}
