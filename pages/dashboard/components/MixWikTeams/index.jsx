import { WindowLayout } from '../window-layout'

import NoTeams from './NoTeams'
import Teams from './Teams'

const MixWikTeams = ({ user, isMixWikTeams }) => {
  return (
    <WindowLayout title='MixWik Teams'>
      <section className='p-5'>
        {
          isMixWikTeams
            ? <Teams currentUser={user} isMixWikTeams={isMixWikTeams} />
            : <NoTeams currentUser={user} />
        }
      </section>
    </WindowLayout>
  )
}

export default MixWikTeams
