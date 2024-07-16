import { SelectGame } from '../../../../../components/create-publication/select-game'
import { WindowLayout } from '../../window-layout'

export const Select = ({ isMixWikTeams, userServer, title }) => {
  return (
    <WindowLayout title={title}>
      <div className='relative flex items-center justify-center h-full'>
        <SelectGame userServer={userServer} isMixWikTeams={isMixWikTeams} />
      </div>
    </WindowLayout>
  )
}
