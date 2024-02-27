import { useState } from 'react'
import { CS2_LEVELS } from '../../../domain/constants'
import FormPosition from '../../Forms/Csgo/Position'
import { FormPremier } from '../../Forms/Csgo/premier'
import TypeOfGamer from '../../Forms/TypeOfGamer'
import { FilterCancelIcon, FilterIcon } from '../../Svg'
import { LevelFilter } from '../components/LevelFilter'
import { AgeFilter } from '../components/ageFilter'
import { DistanceFilter } from '../components/distanceFilter'

export const FilterCs2 = ({ distance, setDistance }) => {
  const [openFilters, setOpenFilters] = useState(false)
  return (
    <section className='relative flex flex-col gap-5 bg-white'>
      <div className='flex justify-evenly items-center z-30 h-[5vh] bg-white'>
        <DistanceFilter distance={distance} setDistance={setDistance} />
        <button
          className={`flex items-center gap-1 ${openFilters && 'text-aero'}`}
          onClick={() => setOpenFilters(prev => !prev)}
        >
          {
          openFilters
            ? (
              <FilterCancelIcon className='w-5 h-5 fill-none' />
              )
            : (

              <FilterIcon className='w-5 h-5 fill-none' />
              )
        }
          Filtros
        </button>
      </div>
      <div className={`fixed bottom-[10vh] md:bottom-0 h-[85vh] md:w-1/2 w-full bg-white z-20 ${openFilters ? 'translate-x-0' : '-translate-x-[100%]'} transition-transform duration-300 p-5`}>
        <AgeFilter />
        <FormPosition />
        <FormPremier />
        <LevelFilter filterForm={CS2_LEVELS} />
        <TypeOfGamer />
      </div>
    </section>
  )
}
