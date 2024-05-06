import { TeamForm } from '../../../../../components/create-publication/team-form'
import { Select } from '../components/select'

export const NewTeam = ({ userServer, isMixWikTeams, page }) => {
  if (page !== 'teams') return null
  return (
    <>
      <TeamForm userServer={userServer} isMixWikTeams={isMixWikTeams} />
      <Select userServer={userServer} isMixWikTeams={isMixWikTeams} title='Crear Team' />
    </>
  )
}
