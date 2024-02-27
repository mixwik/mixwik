import { useState } from 'react'
import { CS2_LEVELS } from '../../../domain/constants'
import FormPosition from '../../Forms/Csgo/Position'
import { FormPremier } from '../../Forms/Csgo/premier'
import TypeOfGamer from '../../Forms/TypeOfGamer'
import { FilterCancelIcon, FilterIcon } from '../../Svg'
import { LevelFilter } from '../components/LevelFilter'
import { AgeFilter } from '../components/ageFilter'

export const FilterCs2 = ({ distance, setDistance }) => {
  const [openFilters, setOpenFilters] = useState(false)
  return (
    <section className='relative flex flex-col gap-5 bg-white'>
      <div className='flex justify-evenly items-center z-30 h-[5vh] bg-white'>
        <div className='flex items-center gap-2'>
          <label className='font-semibold text-slate-900'>
            Distancia
          </label>
          <input
            id='steps-range'
            step='5'
            type='range'
            min='1'
            max='700'
            onChange={(e) => setDistance(e.target.value)}
            value={distance}
            className='w-full h-3 bg-gray-100 shadow-md shadow-gray-300 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:bg-aero [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:size-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-lg'
          />
          <span className='z-10 bottom-4 right-2'>
            {distance > 0 ? distance : 0}Km
          </span>
        </div>
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
