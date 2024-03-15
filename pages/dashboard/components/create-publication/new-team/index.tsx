import { TeamForm } from '../../../../../components/create-publication/team-form'
import { Select } from '../components/select'

export const NewTeam = ({ user, mixWikTeams, page }) => {
  if (page !== 'teams') return null
  return (
    <>
      <TeamForm />
      <Select user={user} mixWikTeams={mixWikTeams} title='Crear Team' />
    </>
  )
}
