import { useState } from 'react'
import { useFilterContext, useSetFilterContext } from '../../context'
import { TYPE_OF_GAME } from '../../domain/constants'
import { FilterCancelIcon, FilterIcon, GamerType } from '../Svg'
import { CheckFilter } from './components/CheckFilter'
import { AgeFilter } from './components/ageFilter'

export const CityGamesFilter = () => {
  const handleSetFilter = useSetFilterContext()
  const filter = useFilterContext()
  const [openFilters, setOpenFilters] = useState(false)
  return (
    <section className='relative flex flex-col gap-5 bg-white'>
      <div className='flex justify-evenly items-center z-30 h-[5vh] bg-white'>
        <button
          className={`flex items-center gap-1 ${openFilters && 'text-aero'}`}
          onClick={() => setOpenFilters(prev => !prev)}
        >
          {openFilters
            ? <FilterCancelIcon className='w-5 h-5 fill-none' />
            : <FilterIcon className='w-5 h-5 fill-none' />}
          Filtros
        </button>
      </div>
      <div
        className={`
          fixed flex flex-col gap-10 bottom-[10vh] md:bottom-0 h-[85vh] md:w-1/2 w-full bg-white z-20 overflow-scroll transition-transform duration-300 py-10 px-10 md:px-20
          ${openFilters
            ? 'translate-x-0'
            : '-translate-x-[100%]'
          } 
        `}
      >
        <AgeFilter />
        <CheckFilter
          filterForm={TYPE_OF_GAME}
          filter={filter.typeOfGamer}
          handleSetFilter={handleSetFilter}
          name='typeOfGamer'
          title='Tipo de jugador'
          icon={<GamerType className='w-auto' />}
        />
      </div>
    </section>
  )
}
