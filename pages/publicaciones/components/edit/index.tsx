import { BackgroundDots } from '../../../../components/background-dots'
import { COLLECTIONS } from '../../../../domain/constants'
import { EditCs2 } from './edit-cs2'

export const Edit = ({ category, page, setEdit, mixWikTeams, publication, setRefetch }) => {
  return (
    <section className='fixed md:top-[10vh] h-[90vh] z-50 w-full flex justify-center'>
      <BackgroundDots />
      <div className='h-full overflow-scroll bg-white md:w-1/2 no-scrollbar'>
        {category === COLLECTIONS.cs2 && <EditCs2 page={page} setEdit={setEdit} mixWikTeams={mixWikTeams} publication={publication} setRefetch={setRefetch} />}
      </div>
    </section>
  )
}
