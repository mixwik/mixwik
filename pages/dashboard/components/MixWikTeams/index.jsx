import { WindowLayout } from '../window-layout'

import NoTeams from './NoTeams'
import Teams from './Teams'

const MixWikTeams = ({ user, mixWikTeams }) => {
  return (
    <WindowLayout title='MixWik Teams'>
      <section className='p-5'>
        {
         mixWikTeams
           ? <Teams currentUser={user} mixWikTeams={mixWikTeams} />
           : <NoTeams currentUser={user} />
        }
      </section>
    </WindowLayout>
  )
}

export default MixWikTeams
