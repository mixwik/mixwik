import { BackgroundDots } from '../../../../components/background-dots'
import { EditGame } from './edit-game'

export const Edit = ({ type, setEdit, mixWikTeams, publication, setRefetch }) => {
  return (
    <section className='fixed md:top-[10vh] top-0 h-[90vh] z-50 w-full flex justify-center'>
      <BackgroundDots />
      <div className='w-full h-full overflow-scroll bg-white md:w-1/2 no-scrollbar'>
        <EditGame type={type} setEdit={setEdit} mixWikTeams={mixWikTeams} publication={publication} setRefetch={setRefetch} />
      </div>
    </section>
  )
}
